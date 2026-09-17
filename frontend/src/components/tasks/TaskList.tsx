import type { Task } from '@/types/tasks';
import TaskItem from './TaskItem';

interface TaskListProps {
   tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
   if (!tasks.length) {
      return (
         <div
            className="
               rounded-lg
               border border-border
               bg-surface-elevated
               p-10
               text-center
            "
         >
            <p className="text-muted">No tasks yet.</p>
         </div>
      );
   }

   return (
      <section
         className="
        overflow-hidden
        rounded-lg
        border border-border
        bg-surface-elevated
      "
      >
         {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
         ))}
      </section>
   );
}
