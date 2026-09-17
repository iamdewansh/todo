import type { Task } from '@/types/tasks';

interface DeleteTaskModalProps {
   task: Task | null;
   onClose: () => void;
   onConfirm: () => void;
}

export default function DeleteTaskModal({ task, onClose, onConfirm }: DeleteTaskModalProps) {
   console.log(task);
   if (!task) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
         <div
            className="
                w-full md:max-w-md max-w-sm
                rounded-lg
                border border-border
                bg-surface-elevated
                p-6
                "
         >
            <h2 className="text-lg font-medium">Delete Task</h2>

            <p className="mt-2 text-sm text-muted">
               Are you sure you want to delete "{task.title}"?
            </p>

            <div className="mt-6 flex justify-end gap-3">
               <button
                  onClick={onClose}
                  className="
                    rounded-md
                    border border-border
                    px-4 py-2
                    "
               >
                  Cancel
               </button>

               <button
                  onClick={onConfirm}
                  className="
                    rounded-md
                    bg-destructive
                    px-4 py-2
                    text-white
                    "
               >
                  Delete
               </button>
            </div>
         </div>
      </div>
   );
}
