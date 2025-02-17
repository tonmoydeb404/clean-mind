import { CustomEditor } from "@/types/editor";
import React, { useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import Toolbar from "./toolbar";

// Define custom types for the editor

const Editor: React.FC = () => {
  const editor = useMemo(
    () => withHistory(withReact(createEditor())) as CustomEditor,
    []
  );

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar />
      <Editable
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        className="bg-white p-4 focus:outline-none rounded-lg prose max-w-full"
      />
    </Slate>
  );
};

export default Editor;

// ----------------------------------------------------------------------

const initialValue: Descendant[] = [
  { type: "paragraph", children: [{ text: "Start typing..." }] },
  {
    type: "bulleted-list",
    children: [
      { type: "list-item", children: [{ text: "Bullet item 1" }] },
      { type: "list-item", children: [{ text: "Bullet item 2" }] },
    ],
  },
  { type: "checkbox", checked: false, children: [{ text: "Check me" }] },
];

const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.code)
    children = (
      <code style={{ background: "#f5f5f5", padding: "2px" }}>{children}</code>
    );

  return <span {...attributes}>{children}</span>;
};

const renderElement = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  switch (element.type) {
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "checkbox":
      return (
        <div {...attributes}>
          <input type="checkbox" className="mr-2" />
          {children}
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};
