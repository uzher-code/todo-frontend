'use client'

import DeleteModal from "@/app/components/DeleteModal";
import TaskCard from "@/app/components/TaskCard";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { TiClipboard } from "react-icons/ti";




export interface ITask {
  id: number,
  title: string,
  color: string,
  completed: boolean,
  createdAt: string,
  updatedAt: string,
}
export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [taskToDelete, setTaskToDelete] = useState<{ id: number; title: string } | null>(null);

  const completedTaskCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks])

  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:4000/tasks');
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, [])

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });

      const res = await fetch('http://localhost:4000/tasks');
      const updated = await res.json();

      setTasks(updated);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      await fetch(`/tasks/${taskToDelete.id}`, { method: 'DELETE' });
      setTasks(prev => prev.filter(t => t.id !== taskToDelete.id));
      setTaskToDelete(null);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <main>
      <div className="flex justify-center w-full px-4 mb-6 -mt-12">
        <button
          onClick={() => router.push('/tasks/new')}
          className="w-full px-8 py-4 bg-todo-button rounded font-semibold shadow transition text-center flex items-center justify-center space-x-2"
        >
          <span>Create Task</span>
          <MdAddCircleOutline size={20} />
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-todo-blue">Tasks</h2>
          <span className="bg-neutral-700 px-2 py-0.5 rounded-full">{tasks.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <h2 className="text-todo-purple">Completed</h2>
          <span className="bg-neutral-700 px-2 py-0.5 rounded-full">{completedTaskCount} of {tasks.length}</span>
        </div>
      </div>

      <div>
        {
          tasks.length === 0
            ? <>
              <hr />
              <div className="flex flex-col items-center mt-10 space-y-2">
                <TiClipboard size={48} className="text-gray-600 mb-2" />
                <div className="text-center text-gray-200 font-semibold">You don't have any tasks registered yet</div>
                <div className="text-center text-gray-400">Create tasks and organize your to-do items</div>
              </div>
            </>
            : (

              tasks.map((task) => <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={() => setTaskToDelete({ id: task.id, title: task.title })}
              />)
            )
        }
      </div>
      {taskToDelete && (
        <DeleteModal
          taskTitle={taskToDelete.title}
          onCancel={() => setTaskToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </main>
  );
}
