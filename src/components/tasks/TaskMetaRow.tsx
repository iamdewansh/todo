import { useState } from 'react';
import PrioritySelector from './PrioritySelector';
import type { Priority } from '@/types/tasks';

export default function TaskMetaRow() {
   const [priority, setPriority] = useState<Priority>('medium');

   return (
      <div
         className="
        flex flex-col gap-3
        p-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
      >
         <div
            className="
          flex flex-col gap-3
          sm:flex-row
        "
         >
            <PrioritySelector value={priority} onChange={setPriority} />
         </div>

         <button
            className="
          h-9
          rounded-md
          bg-primary
          px-4
          text-sm
          font-medium
          text-primary-foreground
          transition-colors
          hover:bg-primary-hover
        "
         >
            Add Task
         </button>
      </div>
   );
}
