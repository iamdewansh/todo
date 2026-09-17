import AppShell from '@/components/layout/AppShell';
import DeleteTaskModal from '@/components/tasks/DeleteTaskModal';
import EditTaskModal from '@/components/tasks/EditTaskModal';
import PageHeader from '@/components/tasks/PageHeader';
import TaskCreationCard from '@/components/tasks/TaskCreationCard';
import TaskFilterBar from '@/components/tasks/TaskFilterBar';
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
            {/* <TaskFilterBar /> */}
            {/* <DeleteTaskModal onClose={() => {}} onConfirm={() => {}} task={tasks[2] as Task} /> */}
            {/* <TaskList tasks={tasks as Task[]} /> */}
            {/* <EditTaskModal task={tasks[2] as Task} /> */}
         </div>
      </AppShell>
   );
}
