'use client';
import { useState, useEffect } from 'react';
import Choice from '@/src/components/forms/choice';
export default function EnquiryForm() {
  const [service, setService] = useState('Residential architecture');
  const [budget, setBudget] = useState('To be discussed');
  const [state, setState] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const context = (document as any).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    Promise.resolve(
      context.registerTool(
        {
          name: 'configure_enquiry_service',
          description:
            'Choose the service in the visible enquiry form. Does not submit an enquiry.',
          inputSchema: {
            type: 'object',
            properties: {
              service: {
                type: 'string',
                enum: [
                  'Residential architecture',
                  'Interior design',
                  'Commercial interiors',
                  'Spatial planning',
                ],
              },
            },
            required: ['service'],
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false },
          execute(input: any) {
            if (
              ![
                'Residential architecture',
                'Interior design',
                'Commercial interiors',
                'Spatial planning',
              ].includes(input?.service)
            )
              throw new Error('Choose a supported service.');
            setService(input.service);
            return { service: input.service, submitted: false };
          },
        },
        { signal: lifecycle.signal },
      ),
    ).catch(() => {});
    return () => lifecycle.abort();
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setState('');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, service, budget }),
      });
      const body = (await res.json()) as { error?: string; id: string };
      if (!res.ok) throw new Error(body.error ?? 'Could not save.');
      setDone(true);
      setState(
        `Thank you. Your enquiry is saved. Reference: ${body.id.slice(0, 8)}. The studio can now review your project.`,
      );
    } catch (err) {
      setState(
        err instanceof Error
          ? err.message
          : 'Unable to save. Please try again.',
      );
    } finally {
      setBusy(false);
    }
  }
  if (done)
    return (
      <div className="feedback" aria-live="polite">
        <h2>A conversation begins.</h2>
        <p>{state}</p>
        <a href="/work" className="text-link">
          Explore the work ↗
        </a>
      </div>
    );
  return (
    <form onSubmit={submit} className="form-grid">
      <label className="field">
        Your name
        <input
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
        />
      </label>
      <label className="field">
        Email address
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
        />
      </label>
      <Choice
        name="service"
        label="What can we help with?"
        values={[
          'Residential architecture',
          'Interior design',
          'Commercial interiors',
          'Spatial planning',
        ]}
        value={service}
        onChange={setService}
      />
      <label className="field">
        Project location
        <input
          name="location"
          required
          maxLength={160}
          placeholder="City / region"
        />
      </label>
      <Choice
        name="budget"
        label="Indicative project budget"
        values={[
          'To be discussed',
          'Under ₹25 lakh',
          '₹25–75 lakh',
          '₹75 lakh–2 crore',
          'Above ₹2 crore',
          'Outside India / other currency',
        ]}
        value={budget}
        onChange={setBudget}
      />
      <label className="field full">
        Tell us about the space
        <textarea
          name="message"
          required
          minLength={20}
          maxLength={5000}
          placeholder="What are you planning? What is not working? Include your ideal timing and anything you already know."
        />
      </label>
      <label className="hidden-field" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="form-note full">
        By sending this enquiry, you agree that Forma may use these details to
        respond about your project. Your submission is stored privately and is
        accessible only to authorized editors. Please avoid sending sensitive
        documents.
      </p>
      <div className="full">
        {state && (
          <p role="alert" className="feedback error">
            {state}
          </p>
        )}
        <button disabled={busy} className="button" type="submit">
          {busy ? 'Saving your enquiry…' : 'Send project enquiry'}{' '}
          <span>↗</span>
        </button>
      </div>
    </form>
  );
}
