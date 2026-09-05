import { database } from '@/src/server/database/content-repository';
import {
  sameOrigin,
  rateLimit,
  readBody,
  str,
} from '@/src/server/http/request-security';
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json(
      { error: 'Request origin was not accepted.' },
      { status: 403 },
    );
  try {
    if (!(await rateLimit(request, 'enquiry', 5)))
      return Response.json(
        { error: 'Too many enquiries. Please try again in an hour.' },
        { status: 429, headers: { 'Retry-After': '3600' } },
      );
    const data = await readBody(request);
    if (data.website)
      return Response.json(
        { error: 'Submission could not be accepted.' },
        { status: 400 },
      );
    const name = str(data.name, 2, 100, 'Name'),
      email = str(data.email, 3, 200, 'Email'),
      location = str(data.location, 1, 160, 'Location'),
      message = str(data.message, 20, 5000, 'Project description'),
      service = str(data.service, 1, 80, 'Service'),
      budget = str(data.budget, 1, 100, 'Budget');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new Error('Enter a valid email address.');
    if (
      ![
        'Residential architecture',
        'Interior design',
        'Commercial interiors',
        'Spatial planning',
      ].includes(service)
    )
      throw new Error('Choose a supported service.');
    const id = crypto.randomUUID();
    await database()
      .prepare(
        'INSERT INTO enquiries (id,name,email,service,location,budget,message,status,created_at) VALUES (?,?,?,?,?,?,?,?,?)',
      )
      .bind(
        id,
        name,
        email,
        service,
        location,
        budget,
        message,
        'new',
        new Date().toISOString(),
      )
      .run();
    return Response.json({ id }, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError)
      return Response.json(
        { error: 'The submitted data is invalid.' },
        { status: 400 },
      );
    const message = error instanceof Error ? error.message : '';
    const validation =
      /must contain|valid email|supported service|too large/.test(message);
    return Response.json(
      {
        error: validation
          ? message
          : 'Your enquiry could not be saved. Please retry.',
      },
      { status: validation ? 400 : 503 },
    );
  }
}
