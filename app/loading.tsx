import { Skeleton } from '@/frontend/components/ui/skeleton';
export default function Loading() {
  return (
    <main id="main" className="wrap page-head" aria-busy="true">
      <p aria-live="polite">Opening the next space…</p>
      <Skeleton className="h-24 w-3/4 rounded-none" />
      <Skeleton className="mt-8 h-80 w-full rounded-none" />
    </main>
  );
}
