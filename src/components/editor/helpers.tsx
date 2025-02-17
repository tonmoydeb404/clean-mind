import {
  BulletedListElement,
  CustomEditor,
  ListItemElement,
} from "@/types/editor";
import { Descendant, Editor, Element, Transforms } from "slate";
import { RenderElementProps, RenderLeafProps } from "slate-react";

export const withLists = (editor: CustomEditor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    // Ensure list children are always 'list-item'
    if (
      Element.isElement(node) &&
      (node.type === "bulleted-list" || node.type === "numbered-list")
    ) {
      for (const [child, childPath] of Editor.nodes(editor, {
        at: path,
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      })) {
        if (!Element.isElement(child) || child.type !== "list-item") {
          // Wrap non-list-items inside a list-item
          Transforms.wrapNodes(
            editor,
            { type: "list-item", children: [] } as ListItemElement,
            { at: childPath }
          );
        }
      }
    }

    // Ensure list-items only exist inside lists
    if (Element.isElement(node) && node.type === "list-item") {
      const parent = Editor.parent(editor, path)[0];
      if (
        !Element.isElement(parent) ||
        (parent.type !== "bulleted-list" && parent.type !== "numbered-list")
      ) {
        // Wrap orphan list-items inside a list
        Transforms.wrapNodes(
          editor,
          { type: "bulleted-list", children: [] } as BulletedListElement,
          { at: path }
        );
      }
    }

    // Call original normalizeNode
    normalizeNode(entry);
  };

  return editor;
};

// ----------------------------------------------------------------------

export const initialValue: Descendant[] = [
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

export const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.code)
    children = (
      <code style={{ background: "#f5f5f5", padding: "2px" }}>{children}</code>
    );

  return <span {...attributes}>{children}</span>;
};

export const renderElement = ({
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
