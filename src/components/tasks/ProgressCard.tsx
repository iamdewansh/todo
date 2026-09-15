export default function ProgressCard() {
   return (
      <div
         className="
        w-55
        rounded-lg
        border border-border
        bg-surface-elevated
        p-4
      "
      >
         <div className="flex items-start justify-between">
            <div>
               <p className="text-sm font-medium text-foreground">3 of 5 completed</p>

               <p className="mt-1 text-xs text-muted">60% target reached</p>
            </div>

            <div
               className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            border border-border
            font-mono
            text-[11px]
            text-muted
          "
            >
               3/5
            </div>
         </div>
      </div>
   );
}
