import AppShell from '@/components/layout/AppShell';
import PageHeader from '@/components/tasks/PageHeader';

export default function TasksPage() {
   return (
      <AppShell>
         <div className="space-y-8">
            <PageHeader />
         </div>
      </AppShell>
   );
}
