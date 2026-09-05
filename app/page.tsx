import { HomeView } from '@/src/components/site/site-sections';
import { listContent } from '@/src/server/database/content-repository';
export const dynamic = 'force-dynamic';
export default async function Home() {
  return <HomeView projects={await listContent('project')} />;
}
