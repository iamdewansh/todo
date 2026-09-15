import TaskInput from "./TaskInput";
import TaskMetaRow from "./TaskMetaRow";

export default function TaskCreationCard() {
  return (
    <section
      className="
        rounded-lg
        border border-border
        bg-surface-elevated
        
      "
    >
      <TaskInput />

      <TaskMetaRow />
    </section>
  );
}