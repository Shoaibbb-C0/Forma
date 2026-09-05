import { listContent } from '@/lib/db';
const origin='https://forma-spatial-studio.nimble-aspen-2182.chatgpt.site';
export default async function sitemap(){return [...['','/work','/services','/studio','/journal','/enquire'].map(p=>({url:origin+p})),...(await listContent()).map(c=>({url:`${origin}/${c.kind==='project'?'work':'journal'}/${c.slug}`,lastModified:new Date(c.updated_at)}))]}
