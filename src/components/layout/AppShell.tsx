import type { ReactNode } from 'react';
import TopNav from './TopNav.tsx';

interface AppShellProps {
   children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
   return (
      <div className="min-h-screen bg-background text-foreground">
         <TopNav />

         <main
            className="
          px-4 py-6
          sm:px-6
          md:px-8 md:py-10
        "
         >
            <div className="mx-auto max-w-5xl">{children}</div>
         </main>
      </div>
   );
}
