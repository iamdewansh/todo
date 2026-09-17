import { MoreHorizontal } from 'lucide-react';
import type { Task } from '@/types/tasks';
import PriorityBadge from './PriorityBadge';
import { useEffect, useRef, useState } from 'react';

interface TaskItemProps {
   task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
   const [menuOpen, setMenuOpen] = useState(false);

   const menuRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
         }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);
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

         <div ref={menuRef} className="relative">
            <button
               type="button"
               onClick={() => setMenuOpen((prev) => !prev)}
               className="
                        rounded-md
                        p-2
                        text-muted
                        hover:bg-surface
                     "
            >
               <MoreHorizontal size={16} />
            </button>

            {menuOpen && (
               <div
                  className="
                        absolute right-0 top-full z-50 mt-1
                        w-32
                        overflow-hidden
                        rounded-lg
                        border border-border
                        bg-surface-elevated
                        "
               >
                  <button
                     type="button"
                     onClick={() => {
                        // onEdit(task);
                        setMenuOpen(false);
                     }}
                     className="
                              flex w-full items-center
                              px-3 py-2
                              text-sm
                              text-foreground
                              hover:bg-surface-hover
                           "
                  >
                     Edit
                  </button>

                  <button
                     type="button"
                     onClick={() => {
                        // onDelete(task.id);
                        setMenuOpen(false);
                     }}
                     className="
                              flex w-full items-center
                              px-3 py-2
                              text-sm
                              text-destructive
                              hover:bg-surface-hover
                           "
                  >
                     Delete
                  </button>
               </div>
            )}
         </div>
      </div>
   );
}
