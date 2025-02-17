import { CustomText } from "@/types/editor";
import { ReactNode, useCallback } from "react";
import { Editor, Text, Transforms } from "slate";
import { useSlate } from "slate-react";
import { twMerge } from "tailwind-merge";

type Props = { format: keyof CustomText; icon: ReactNode };

const ToolbarButton: React.FC<Props> = (props) => {
  const { format, icon } = props;
  const editor = useSlate();

  const [match] = Editor.nodes(editor, {
    match: (n) => Text.isText(n) && n[format] === true,
    universal: true,
  });

  const toggleFormat = useCallback(() => {
    Transforms.setNodes(
      editor,
      { [format]: match ? undefined : true } as Partial<CustomText>,
      { match: (n) => Text.isText(n), split: true }
    );
  }, [editor, format, match]);

  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleFormat();
      }}
      className={twMerge(
        "size-8 inline-flex items-center justify-center rounded-md cursor-pointer ",
        match ? "bg-black text-white hover:bg-black/70" : "hover:bg-neutral/20"
      )}
    >
      {icon}
    </button>
  );
};

export default ToolbarButton;
