'use client';

import TaskForm from '@/app/components/TaskForm';
import { useRouter } from 'next/navigation';
import { MdAddCircleOutline } from "react-icons/md";

const CreateTaskPage = () => {
  const router = useRouter();

  const handleCreate = async ({ title, color }: { title: string; color: string }) => {
    const res = await fetch('http://localhost:4000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, color }),
    });

    if (res.ok) router.push('/');
    else alert('Failed to create task');
  };

  return (
    <TaskForm
      onSubmit={handleCreate}
      submitLabel={
        <span className="flex items-center justify-center gap-2">
          Add Task <MdAddCircleOutline size={20} />
        </span>
      }
    />
  );
}

export default CreateTaskPage
