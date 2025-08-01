'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TaskForm from '@/app/components/TaskForm';
import { FaCheck } from "react-icons/fa";


const EditTaskPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [task, setTask] = useState<{ title: string; color: string } | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:4000/tasks/${id}`);
        if (!res.ok) throw new Error('Task not found');

        const data = await res.json();
        setTask({ title: data.title, color: data.color });
      } catch (error) {
        console.error('Error fetching task:', error);
        router.push('/');
      }
    };

    fetchTask();
  }, [id, router]);

  const handleUpdate = async ({ title, color }: { title: string; color: string }) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, color, completed: false }),
    });

    if (res.ok) router.push('/');
    else alert('Failed to update task');
  };

  if (!task) return <div className="text-center mt-10">Loading...</div>;

  return (
    <TaskForm
      initialTitle={task.title}
      initialColor={task.color}
      onSubmit={handleUpdate}
      submitLabel={
        <span className="flex items-center justify-center gap-2">
          Save <FaCheck size={14} />
        </span>
      }
    />
  );
}

export default EditTaskPage;
