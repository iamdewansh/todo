import AppShell from '@/components/layout/AppShell';
import PageHeader from '@/components/tasks/PageHeader';
import TaskCreationCard from '@/components/tasks/TaskCreationCard';

export default function TasksPage() {
   return (
      <AppShell>
         <div className="space-y-8">
            <PageHeader />

            <TaskCreationCard />
         </div>
      </AppShell>
   );
}
