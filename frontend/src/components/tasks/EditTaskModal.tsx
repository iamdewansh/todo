import { useEffect, useState } from 'react';

import PrioritySelector from './PrioritySelector';

import type { Task, Priority } from '@/types/tasks';

interface EditTaskModalProps {
   task: Task | null;
   onClose: () => void;
   onSave: (updatedTask: Task) => void;
}

export default function EditTaskModal({ task, onClose, onSave }: EditTaskModalProps) {
   const [title, setTitle] = useState('');
   const [priority, setPriority] = useState<Priority>('medium');

   useEffect(() => {
      if (!task) return;

      setTitle(task.title);
      setPriority(task.priority);
   }, [task]);

   if (!task) return null;

   const handleSubmit = () => {
      if (!title.trim()) return;

      onSave({
         ...task,
         title,
         priority,
      });
   };

   return (
      <div
         className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60
        p-4
      "
      >
         <div
            className="
          w-full max-w-lg
          rounded-lg
          border border-border
          bg-surface-elevated
          p-6
        "
         >
            <div className="mb-6">
               <h2 className="text-lg font-semibold">Edit Task</h2>

               <p className="mt-1 text-sm text-muted">Update task details.</p>
            </div>

            <div className="space-y-4">
               {/* Title */}
               <div>
                  <label
                     className="
                mb-2 block
                text-sm
                font-medium
              "
                  >
                     Title
                  </label>

                  <input
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     className="
                        h-10 w-full
                        rounded-md
                        border border-border
                        bg-surface
                        px-3
                        text-sm
                        outline-none
                        focus:border-border-focus
                        "
                  />
               </div>

               {/* Priority */}
               <div>
                  <label className="flex flex-col gap-2 text-sm font-medium w-fit">
                     Priority
                     <PrioritySelector value={priority} onChange={setPriority} />
                  </label>
               </div>
            </div>

            <div
               className="
            mt-6
            flex justify-end gap-3
          "
            >
               <button
                  onClick={onClose}
                  className="rounded-md border border-border
                        px-4 py-2
                        text-sm
                        hover:bg-surface-hover
                        "
               >
                  Cancel
               </button>

               <button
                  onClick={handleSubmit}
                  className="
                    rounded-md
                    bg-primary
                    px-4 py-2
                    text-sm
                    font-medium
                    text-primary-foreground
                    hover:bg-primary-hover
                    "
               >
                  Save Changes
               </button>
            </div>
         </div>
      </div>
   );
}
