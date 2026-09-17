export default function TaskInput() {
   return (
      <div className="border-b border-border">
         <input
            type="text"
            placeholder="What needs to be done?"
            className="
                h-14
                w-full
                border-0
                bg-transparent
                px-4
                text-sm
                text-foreground
                placeholder:text-subtle
                focus:outline-none"
         />
      </div>
   );
}
