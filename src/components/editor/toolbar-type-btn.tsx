import { CustomElement } from "@/types/editor";
import { ReactNode, useCallback } from "react";
import { Editor, Element, Transforms } from "slate";
import { useSlate } from "slate-react";
import { twMerge } from "tailwind-merge";

type Props = { type: CustomElement["type"]; icon: ReactNode };

const ToolbarTypeButton: React.FC<Props> = ({ type, icon }) => {
  const editor = useSlate();

  const [match] = Editor.nodes(editor, {
    match: (n) => Element.isElement(n) && n.type === type,
    universal: true,
  });

  const toggleFormat = useCallback(() => {
    const isActive = !!match;

    // Ensure that list items are properly nested in a list
    if (type === "bulleted-list" || type === "numbered-list") {
      Transforms.wrapNodes(editor, { type, children: [] } as any, {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      });
      return;
    }

    // Ensure checkboxes maintain their structure
    if (type === "checkbox") {
      Transforms.setNodes(editor, { type, checked: false } as any, {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      });
      return;
    }

    // Toggle between selected block type and default "paragraph"
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : type },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }, [editor, match, type]);

  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleFormat();
      }}
      className={twMerge(
        "size-8 inline-flex items-center justify-center rounded-md cursor-pointer",
        match ? "bg-black text-white hover:bg-black/70" : "hover:bg-neutral/20"
      )}
    >
      {icon}
    </button>
  );
};

export default ToolbarTypeButton;
