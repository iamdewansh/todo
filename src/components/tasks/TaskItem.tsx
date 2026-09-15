import { MoreHorizontal } from 'lucide-react';
import type { Task } from '@/types/tasks';
import PriorityBadge from './PriorityBadge';

interface TaskItemProps {
   task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
   return (
      <div
         className="
        flex items-start gap-3
        border-b border-border
        p-4
        transition-colors
        hover:bg-surface-hover
      "
      >
         <input
            type="checkbox"
            checked={task.completed}
            className="
          mt-1
          h-4 w-4
          rounded-sm
          border-border
          bg-surface-input
        "
            readOnly
         />

         <div className="flex-1">
            <p
               className={`
            text-sm
            ${task.completed ? 'text-muted line-through' : 'text-foreground'}
          `}
            >
               {task.title}
            </p>

            <div
               className="
            mt-2
            flex flex-wrap
            gap-2
          "
            >
               <PriorityBadge priority={task.priority} />
            </div>
         </div>

         <button
            className="
          rounded-md
          p-2
          text-muted
          hover:bg-surface
        "
         >
            <MoreHorizontal size={16} />
         </button>
      </div>
   );
}
