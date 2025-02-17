import { CustomEditor } from "@/types/editor";
import React, { useMemo } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { initialValue, renderElement, renderLeaf } from "./helpers";
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
