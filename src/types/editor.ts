// Import necessary types from Slate and its extensions
import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

/**
 * Custom Text Type
 * Represents the text nodes in the editor with optional formatting marks.
 */
export type CustomText = {
  text: string; // The actual text content
  bold?: boolean; // Bold formatting
  italic?: boolean; // Italic formatting
  underline?: boolean; // Underline formatting
  code?: boolean; // Code formatting
};

/**
 * Paragraph Element
 * Represents a paragraph block in the editor.
 */
export type ParagraphElement = {
  type: "paragraph"; // Block type identifier
  children: CustomText[]; // Array of text nodes
};

/**
 * Block Quote Element
 * Represents a block quote in the editor.
 */
export type BlockQuoteElement = {
  type: "block-quote"; // Block type identifier
  children: CustomText[]; // Array of text nodes
};

/**
 * List Item Element
 * Represents an individual item in a list.
 */
export type ListItemElement = {
  type: "list-item"; // Block type identifier
  children: CustomText[]; // Array of text nodes
};

/**
 * Bulleted List Element
 * Represents a bulleted (unordered) list.
 */
export type BulletedListElement = {
  type: "bulleted-list"; // Block type identifier
  children: ListItemElement[]; // Array of list items
};

/**
 * Numbered List Element
 * Represents a numbered (ordered) list.
 */
export type NumberedListElement = {
  type: "numbered-list"; // Block type identifier
  children: ListItemElement[]; // Array of list items
};

/**
 * Heading One Element
 * Represents a level-one heading.
 */
export type HeadingOneElement = {
  type: "heading-one"; // Block type identifier
  children: CustomText[]; // Array of text nodes
};

/**
 * Heading Two Element
 * Represents a level-two heading.
 */
export type HeadingTwoElement = {
  type: "heading-two"; // Block type identifier
  children: CustomText[]; // Array of text nodes
};

/**
 * Custom Element Union Type
 * Combines all possible block types in the editor.
 */
export type CustomElement =
  | ParagraphElement
  | BlockQuoteElement
  | ListItemElement
  | BulletedListElement
  | NumberedListElement
  | HeadingOneElement
  | HeadingTwoElement;

/**
 * Extend Slate's Default Types
 * Augment the Slate module to include custom types for Editor, Element, and Text.
 */
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor; // Combine all editor functionalities
    Element: CustomElement; // Use the custom element union type
    Text: CustomText; // Use the custom text type
  }
}

/**
 * Custom Editor Type
 * Extends the base editor with additional methods or properties.
 */
interface CustomEditor extends BaseEditor, ReactEditor, HistoryEditor {
  toggleMark: (format: string) => void; // Example method for toggling marks
  toggleBlock: (format: string) => void; // Example method for toggling blocks
}

export type { CustomEditor };
