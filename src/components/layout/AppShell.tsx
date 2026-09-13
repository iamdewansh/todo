import type { ReactNode } from 'react';
import TopNav from './TopNav.tsx';

interface AppShellProps {
	children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<TopNav />

			<main className="px-8 py-10">
				<div className="mx-auto max-w-5xl">{children}</div>
			</main>
		</div>
	);
}
