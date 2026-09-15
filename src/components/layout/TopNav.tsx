import { Settings2, User, CheckSquare } from 'lucide-react';

export default function TopNav() {
   return (
      <header className="border-b border-border">
         <div className="mx-auto flex h-12 items-center justify-between px-6">
            {/* Left */}
            <div className="flex items-center gap-2">
               <CheckSquare size={16} className="text-foreground" />

               <span className="text-sm font-medium">Tasks</span>

               <span
                  className="rounded-sm
                                    border border-border
                                    px-1.5 py-0.5
                                    font-mono
                                    text-[10px]
                                    text-subtle
                                    "
               >
                  v1.0
               </span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
               <button
                  className="rounded-sm
                                    border border-border
                                    px-2 py-1
                                    font-mono
                                    text-[11px]
                                    text-muted
                                    transition-colors
                                    hover:bg-surface-hover
                                    "
               >
                  ⌘K
               </button>

               <button
                  className="flex h-8 w-8 items-center justify-center
                                    rounded-md
                                    text-muted
                                    transition-colors
                                    hover:bg-surface-hover
                                    "
               >
                  <Settings2 size={15} />
               </button>

               <button
                  className="flex h-8 w-8 items-center justify-center
                                    rounded-full
                                    border border-border
                                    "
               >
                  <User size={14} />
               </button>
            </div>
         </div>
      </header>
   );
}
