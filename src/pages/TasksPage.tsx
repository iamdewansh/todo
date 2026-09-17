import AppShell from '@/components/layout/AppShell';
import PageHeader from '@/components/tasks/PageHeader';
import TaskCreationCard from '@/components/tasks/TaskCreationCard';
import TaskList from '@/components/tasks/TaskList';
import type { Task } from '@/types/tasks';

export default function TasksPage() {
   const tasks = [
      {
         id: '1',
         title: 'Design dashboard UI',
         completed: false,
         priority: 'high',
      },
      {
         id: '2',
         title: 'Review pull requests',
         completed: false,
         priority: 'medium',
      },
      {
         id: '3',
         title: 'Deploy',
         completed: true,
         priority: 'low',
      },
   ];
   return (
      <AppShell>
         <div className="space-y-8">
            <PageHeader />

            <TaskCreationCard />
            
            <TaskList tasks={tasks as Task[]} />
         </div>
      </AppShell>
   );
}
