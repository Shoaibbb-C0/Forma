import { HomeView } from '@/components/site';
import { listContent } from '@/lib/db';
export const dynamic='force-dynamic';
export default async function Home(){return <HomeView projects={await listContent('project')} />}
