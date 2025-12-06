import React from "react";

interface SessionsCompletionCardProps {
  completed: number;
  uncompleted: number;
  completedLabel: string;
  uncompletedLabel: string;
}

export default function SessionsCompletionCard({
  completed,
  uncompleted,
  completedLabel,
  uncompletedLabel,
}: SessionsCompletionCardProps) {
  return (
    <div className="max-w-xl w-full rounded-xl p-6 shadow-sm bg-white py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Completed */}
            <div className="flex flex-col items-center flex-1">
                <h2 className="text-sm font-medium text-green-700">{completedLabel}</h2>
                <p className="text-4xl font-bold text-green-700 mt-2">{completed}</p>
            </div>

            {/* Divider */}
            <div className="hidden md:block mx-6 h-12 w-px bg-gray-300"></div>

            {/* Mobile divider */}
            <div className="block md:hidden my-4 h-px w-full bg-gray-300"></div>

            {/* Uncompleted */}
            <div className="flex flex-col items-center flex-1">
                <h2 className="text-sm font-medium text-gray-600">{uncompletedLabel}</h2>
                <p className="text-4xl font-bold text-gray-600 mt-2">{uncompleted}</p>
            </div>
        </div>
    </div>
  );
}
