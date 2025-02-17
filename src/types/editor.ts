import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

export type ParagraphElement = { type: "paragraph"; children: CustomText[] };
export type ListItemElement = { type: "list-item"; children: CustomText[] };
export type BulletedListElement = {
  type: "bulleted-list";
  children: ListItemElement[];
};
export type NumberedListElement = {
  type: "numbered-list";
  children: ListItemElement[];
};
export type CheckboxElement = {
  type: "checkbox";
  checked: boolean;
  children: CustomText[];
};

export type CustomElement =
  | ParagraphElement
  | ListItemElement
  | BulletedListElement
  | NumberedListElement
  | CheckboxElement;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

interface CustomEditor extends BaseEditor, ReactEditor, HistoryEditor {
  exec: (command: any) => void;
}

export type { CustomEditor };
