import ProgressCard from './ProgressCard';

export default function PageHeader() {
   return (
      <section
         className="
        flex flex-col gap-6
        sm:flex-row
        sm:items-start
        sm:justify-between
      "
      >
         <div>
            <h1
               className="
              text-[32px]
              font-semibold
              tracking-tight
              text-foreground
            "
            >
               Tasks
            </h1>

            <p className="mt-2 text-sm text-muted">Stay organized and get things done.</p>
         </div>

         <ProgressCard />
      </section>
   );
}
