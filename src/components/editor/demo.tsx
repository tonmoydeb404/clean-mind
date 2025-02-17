import { CustomElement, CustomText } from "@/types/editor";
import isHotkey from "is-hotkey";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import {
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Transforms,
} from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSlate,
  withReact,
} from "slate-react";
import { twMerge } from "tailwind-merge";

// TypeScript Interfaces
interface BaseProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

interface ButtonProps extends BaseProps {
  icon?: React.ReactNode;
  format: TextFormat | ElementFormat; // Include list formats
}

type TextFormat = keyof Omit<CustomText, "text">;
type ElementFormat = CustomElement["type"];
// type Format = TextFormat | ElementFormat;

// Hotkeys Configuration
const HOTKEYS: Record<string, TextFormat> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES: ElementFormat[] = ["numbered-list", "bulleted-list"];

// Main RichText Component
const RichTextExample: React.FC = () => {
  const [_value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event.nativeEvent)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(newValue) => setValue(newValue)}
    >
      <Toolbar>
        <MarkButton format="bold" icon={<Bold />} />
        <MarkButton format="italic" icon={<Italic />} />
        <MarkButton format="underline" icon={<Underline />} />
        <MarkButton format="code" icon={<Code />} />
        <BlockButton format="bulleted-list" icon={<List />} />
        <BlockButton format="numbered-list" icon={<ListOrdered />} />
        <BlockButton format="heading-one" icon={<Heading1 />} />
        <BlockButton format="heading-two" icon={<Heading2 />} />
      </Toolbar>
      <Editable
        className="border border-gray-300 p-4 rounded-md min-h-[200px] focus:outline-none prose max-w-full"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={handleKeyDown}
      />
    </Slate>
  );
};

// Toolbar Component
const Toolbar: React.FC<BaseProps> = ({ children }) => {
  return <div className="flex gap-2 mb-4">{children}</div>;
};

// MarkButton Component
const MarkButton: React.FC<ButtonProps> = ({ format, icon }) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format as TextFormat);

  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format as TextFormat);
      }}
      className={twMerge(
        "p-2 rounded-md flex items-center justify-center",
        isActive ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
      )}
    >
      {icon}
    </button>
  );
};

// BlockButton Component
const BlockButton: React.FC<ButtonProps> = ({ format, icon }) => {
  const editor = useSlate();
  const isActive = isBlockActive(editor, format as ElementFormat);

  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format as ElementFormat);
      }}
      className={twMerge(
        "p-2 rounded-md flex items-center justify-center",
        isActive ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
      )}
    >
      {icon}
    </button>
  );
};

// Toggle Mark Function
const toggleMark = (editor: Editor, format: TextFormat) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// Toggle Block Function
const toggleBlock = (editor: Editor, format: ElementFormat) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });

  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

// Check if Mark is Active
const isMarkActive = (editor: Editor, format: TextFormat): boolean => {
  const marks = Editor.marks(editor);
  return marks ? !!marks[format] : false;
};

// Check if Block is Active
const isBlockActive = (editor: Editor, format: ElementFormat): boolean => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};

// Element Renderer
const Element: React.FC<RenderElementProps> = ({
  attributes,
  children,
  element,
}) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

// Leaf Renderer
const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
};

// Initial Value
const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "This is editable rich text." }],
  },
];

export default RichTextExample;
