import { UserMenu } from '@/components/user-menu';
import { getOrganizations } from '@/data/getOrganizations';
import { auth } from '@/utils/auth';
import { Skeleton } from '@comp/ui/skeleton';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { AssistantButton } from './ai/chat-button';
import { MobileMenu } from './mobile-menu';

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentOrganizationId = session?.session.activeOrganizationId;

  if (!currentOrganizationId) {
    redirect('/');
  }

  const { organizations } = await getOrganizations();

  return (
    <header className="border/40 sticky top-0 z-10 flex items-center justify-between border-b px-4 py-2 backdrop-blur-sm">
      <MobileMenu organizationId={currentOrganizationId} organizations={organizations} />

      <AssistantButton />

      <div className="ml-auto flex space-x-2">
        <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
          <UserMenu />
        </Suspense>
      </div>
    </header>
  );
}
