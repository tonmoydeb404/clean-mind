import {
  LucideBold,
  LucideCode,
  LucideItalic,
  LucideList,
  LucideListOrdered,
  LucideListTodo,
  LucideUnderline,
} from "lucide-react";
import React from "react";
import ToolbarButton from "./toolbar-btn";
import ToolbarTypeButton from "./toolbar-type-btn";

const Toolbar: React.FC = () => {
  return (
    <div className="mb-5 flex items-center gap-2 fixed bottom-10 left-[50%] -translate-x-[50%] px-1 py-1 border border-neutral/10 rounded-lg bg-white/90 backdrop-blur-2xl">
      <ToolbarButton format="bold" icon={<LucideBold size={16} />} />
      <ToolbarButton format="italic" icon={<LucideItalic size={16} />} />
      <ToolbarButton format="underline" icon={<LucideUnderline size={16} />} />
      <ToolbarButton format="code" icon={<LucideCode size={16} />} />
      <ToolbarTypeButton type="list-item" icon={<LucideList size={16} />} />
      <ToolbarTypeButton
        type="numbered-list"
        icon={<LucideListOrdered size={16} />}
      />
      <ToolbarTypeButton type="checkbox" icon={<LucideListTodo size={16} />} />
    </div>
  );
};

export default Toolbar;
