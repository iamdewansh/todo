export default function ProgressCard() {
   const completed = 1;
   const total = 5;
   const percentage = (completed / total) * 100;

   return (
      <div
         className="
            w-full sm:w-55
            rounded-lg
            border border-border
            bg-surface-elevated
            p-4
         "
      >
         <div className="flex items-start justify-between">
            <div>
               <p className="text-sm font-medium text-foreground">
                  {completed} of {total} completed
               </p>

               <p className="mt-1 text-xs text-muted">{percentage}% target reached</p>
            </div>

            <div
               className="relative flex h-10 w-10 items-center justify-center rounded-full"
               style={{
                  background: `conic-gradient(
                     var(--color-primary) ${percentage}%,
                     var(--color-border) ${percentage}%
                  )`,
               }}
            >
               {/* Inner circle creates the ring */}
               <div
                  className="
                     flex h-8 w-8 items-center justify-center
                     rounded-full
                     bg-surface-elevated
                     font-mono
                     text-[11px]
                     text-muted
                  "
               >
                  {completed}/{total}
               </div>
            </div>
         </div>
      </div>
   );
}
