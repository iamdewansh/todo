import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type Priority = 'low' | 'medium' | 'high';

interface PrioritySelectorProps {
   value: Priority;
   onChange: (priority: Priority) => void;
}

const priorities: Priority[] = ['low', 'medium', 'high'];

const dotStyles = {
   low: 'border-priority-low bg-priority-low',
   medium: 'border-priority-medium bg-priority-medium',
   high: 'border-priority-high bg-priority-high',
};

export default function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
   const [open, setOpen] = useState(false);

   const wrapperRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setOpen(false);
         }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   return (
      <div ref={wrapperRef} className="relative">
         <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="
                     flex h-9 items-center gap-2
                     rounded-md
                     border border-border
                     bg-surface-elevated
                     px-3
                     text-sm
                     text-foreground
                     hover:bg-surface-hover
                  "
         >
            <span className={`h-2.5 w-2.5 rounded-full border ${dotStyles[value]}`} />

            <span className="capitalize">{value}</span>

            <ChevronDown
               size={14}
               className={`
            transition-transform
            ${open ? 'rotate-180' : ''}
          `}
            />
         </button>

         {open && (
            <div
               className="
            absolute left-0 top-full z-50 mt-1
            min-w-40
            rounded-lg
            border border-border
            bg-surface-elevated
            p-1
          "
            >
               {priorities.map((priority) => (
                  <button
                     key={priority}
                     type="button"
                     onClick={() => {
                        onChange(priority);
                        setOpen(false);
                     }}
                     className="
                              flex w-full items-center gap-2
                              rounded-md
                              px-3 py-2
                              text-sm
                              capitalize
                              hover:bg-surface-hover
                              "
                  >
                     <span className={`h-2.5 w-2.5 rounded-full border ${dotStyles[priority]}`} />

                     {priority}
                  </button>
               ))}
            </div>
         )}
      </div>
   );
}
