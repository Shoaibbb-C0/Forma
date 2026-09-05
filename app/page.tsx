import { HomeView } from '@/frontend/components/site/site-sections';
import { listContent } from '@/backend/database/content-repository';
export const dynamic = 'force-dynamic';
export default async function Home() {
  return <HomeView projects={await listContent('project')} />;
}
