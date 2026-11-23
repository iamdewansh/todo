-- Create priority enum
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');

-- Add priority column
ALTER TABLE public.todos
ADD COLUMN priority task_priority NOT NULL DEFAULT 'low';