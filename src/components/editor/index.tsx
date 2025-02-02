import { CustomEditor } from "@/types/editor";
import React, { useCallback, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, RenderLeafProps, Slate, withReact } from "slate-react";
import Toolbar from "./toolbar";

// Define custom types for the editor

const Editor: React.FC = () => {
  const editor = useMemo(
    () => withHistory(withReact(createEditor())) as CustomEditor,
    []
  );

  const initialValue: Descendant[] = [
    { type: "paragraph", children: [{ text: "Start typing..." }] },
  ];

  const renderLeaf = useCallback(
    ({ attributes, children, leaf }: RenderLeafProps) => {
      if (leaf.bold) children = <strong>{children}</strong>;
      if (leaf.italic) children = <em>{children}</em>;
      if (leaf.underline) children = <u>{children}</u>;
      if (leaf.code)
        children = (
          <code style={{ background: "#f5f5f5", padding: "2px" }}>
            {children}
          </code>
        );
      return <span {...attributes}>{children}</span>;
    },
    []
  );

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar />
      <Editable
        renderLeaf={renderLeaf}
        className="bg-white p-4 focus:outline-none rounded-lg"
      />
    </Slate>
  );
};

export default Editor;
