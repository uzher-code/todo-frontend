'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdArrowBack } from "react-icons/io";
import { COLORS, colorMap } from '@/app/lib/colors';



type TTaskFormProps = {
  initialTitle?: string;
  initialColor?: string;
  onSubmit: (data: { title: string; color: string }) => Promise<void>;
  submitLabel: React.ReactNode;
};


const TaskForm: FC<TTaskFormProps> = ({
  initialTitle = '',
  initialColor = 'blue',
  onSubmit,
  submitLabel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    await onSubmit({ title, color });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <button onClick={() => router.push('/')} className="text-gray-400 hover:text-blue-500 transition">
          <IoMdArrowBack size={20} />
        </button>

      </div>
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input
          className="w-full px-4 py-2 rounded bg-input-background border border-background placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          placeholder='Ex. Brush your teeth'
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
      </div>

      <div>
        <label className="block mb-1 font-semibold text-blue-400">Color</label>
        <div className="flex items-center space-x-3 mt-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              title={c}
              className={
                `w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110 duration-150
                ${color === c ? 'ring-2 ring-white border-white' : 'border-transparent'}
                ${colorMap[c]}`
              }
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full px-6 py-2 bg-todo-button hover:bg-todo-button-700 rounded font-semibold"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;