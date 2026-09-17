type Filter = 'all' | 'active' | 'completed';

interface TaskFilterBarProps {
   filter: Filter;
   onFilterChange: (filter: Filter) => void;
   remainingCount: number;
   completedCount: number;
   onClearCompleted: () => void;
}

const filters: Filter[] = ['all', 'active', 'completed'];

export default function TaskFilterBar({
   filter,
   onFilterChange,
   remainingCount,
   completedCount,
   onClearCompleted,
}: TaskFilterBarProps) {
   return (
      <div
         className="
        flex flex-col gap-4
        md:flex-row
        md:items-center
        md:justify-between
      "
      >
         <div className="flex items-center gap-1">
            {filters.map((item) => (
               <button
                  key={item}
                  onClick={() => onFilterChange(item)}
                  className={`
              rounded-md
              px-3 py-2
              text-sm
              capitalize
              transition-colors

              ${
                 filter === item
                    ? 'bg-surface-elevated text-foreground border border-border'
                    : 'text-muted hover:bg-surface-hover'
              }
            `}
               >
                  {item}
               </button>
            ))}
         </div>

         <div
            className="
          flex flex-col gap-3
          text-sm
          md:flex-row
          md:items-center
          md:gap-6
        "
         >
            <span className="text-muted">Remaining: {remainingCount}</span>

            <button
               onClick={onClearCompleted}
               disabled={completedCount === 0}
               className="
            text-muted
            hover:text-foreground
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
            >
               Clear Completed
            </button>
         </div>
      </div>
   );
}
