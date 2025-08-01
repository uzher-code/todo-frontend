'use client'
import { ITask } from "@/app/page"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { AiOutlineCheck } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

type TTaskCardProps = {
  task: ITask;
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: () => void;
}
const TaskCard: FC<TTaskCardProps> = ({ task, onToggleComplete, onDelete }) => {
  const router = useRouter();

  return (
    <div className={`flex items-center justify-between px-4 py-4 rounded-md border bg-neutral-700 border-neutral-700 my-4`}>
      <div
        className="flex items-center gap-3 relative cursor-pointer"
        onClick={() => router.push(`/tasks/${task.id}`)}
      >
        {/* Custom Checkbox */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id, !task.completed)}
            className={`
              w-5 h-5 appearance-none rounded-full border-2
              ${task.completed ? 'bg-purple-600 border-purple-600' : 'border-blue-500'}
              flex items-center justify-center
              transition-all duration-150 relative
            `}
          />
          {task.completed && (
            <AiOutlineCheck className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none" />
          )}
        </div>

        <p className={`${task.completed ? 'line-through text-gray-500' : 'text-white'
          }`}>
          {task.title}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }} className="text-gray-400 hover:text-red-500 transition">
        <FaTrashAlt size={14} />
      </button>
    </div>
  )
}

export default TaskCard