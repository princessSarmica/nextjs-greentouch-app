// components/addContentCard.tsx
import React from "react";
import { CardContent } from "./ui/card";
import { PlusCircle as AddIcon } from "lucide-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const AddContentCard = React.forwardRef<HTMLButtonElement, ButtonProps>(function AddContentCard(props, ref) {
  const { className = "", ...rest } = props;

  return (
    <button
      ref={ref}
      type="button"
      {...rest}
      className={`p-0 flex flex-col h-full overflow-hidden rounded-lg shadow-md transition-shadow bg-white border-3 cursor-pointer hover:shadow-lg w-full ${className}`}
    >
      <CardContent className="flex flex-col items-center justify-center h-48 sm:m-auto gap-3">
        <AddIcon className="h-12 w-12 text-[#65a164]" />
        <p className="text-sm font-medium text-gray-700">Add New Article</p>
      </CardContent>
    </button>
  );
});

export default AddContentCard;
