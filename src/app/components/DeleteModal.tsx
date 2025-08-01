'use client';

import { FC } from 'react';

type TDeleteModalProps = {
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteModal: FC<TDeleteModalProps> = ({ taskTitle, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

      <div className="bg-gray-800 p-6 rounded-md w-full max-w-sm border border-gray-600">
        <h2 className="text-lg font-bold mb-4">Delete Task?</h2>
        <p className="text-gray-300 mb-6">Are you sure you want to delete “<strong>{taskTitle}</strong>”?</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-600hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
