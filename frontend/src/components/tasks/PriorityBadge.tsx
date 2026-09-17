import type { Priority } from '@/types/tasks.ts';

interface PriorityBadgeProps {
   priority: Priority;
}

const styles: Record<Priority, { text: string; bg: string; border: string }> = {
   low: {
      text: 'text-priority-low',
      bg: 'bg-priority-low-bg',
      border: 'border-priority-low/20',
   },
   medium: {
      text: 'text-priority-medium',
      bg: 'bg-priority-medium-bg',
      border: 'border-priority-medium/20',
   },
   high: {
      text: 'text-priority-high',
      bg: 'bg-priority-high-bg',
      border: 'border-priority-high/20',
   },
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
   const style = styles[priority];

   return (
      <span
         className={`
        inline-flex items-center gap-1.5
        rounded-sm
        border
        px-2 py-1
        text-[11px]
        font-medium
        capitalize
        ${style.text}
        ${style.bg}
        ${style.border}
      `}
      >
         <span
            className={`
          h-1.5 w-1.5 rounded-full
           bg-current
        `}
         />

         {priority}
      </span>
   );
}
