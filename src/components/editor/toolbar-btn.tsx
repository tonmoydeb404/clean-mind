import { CustomText } from "@/types/editor";
import { ReactNode, useCallback, useMemo } from "react";
import { Editor, Text, Transforms } from "slate";
import { useSlate } from "slate-react";
import { twMerge } from "tailwind-merge";

type Props = { format: keyof CustomText; icon: ReactNode };

const ToolbarButton: React.FC<Props> = (props) => {
  const { format, icon } = props;
  const editor = useSlate();

  const isActive = useMemo(() => {
    const [match] = Editor.nodes(editor, {
      match: (n) => Text.isText(n) && (n as CustomText)[format] === true,
      universal: true,
    });
    return !!match;
  }, [editor, format]);

  const toggleFormat = useCallback(() => {
    Transforms.setNodes(
      editor,
      { [format]: isActive ? undefined : true } as Partial<CustomText>,
      { match: (n) => Text.isText(n), split: true }
    );
  }, [editor, format, isActive]);

  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleFormat();
      }}
      className={twMerge(
        "size-8 inline-flex items-center justify-center rounded-md cursor-pointer hover:bg-neutral/20"
      )}
    >
      {icon}
    </button>
  );
};

export default ToolbarButton;
