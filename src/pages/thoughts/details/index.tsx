import Button from "@/components/ui/button";
import paths from "@/router/paths";
import { LucideHome, LucideSave, LucideX } from "lucide-react";
import { DOMAttributes } from "react";
import { Link } from "react-router-dom";
import EditableSection from "./editable";

type Props = {};

const ThoughtsDetailsPage = (_props: Props) => {
  const handleKeyDown: DOMAttributes<HTMLHeadingElement>["onKeyDown"] = (e) => {
    if (e.code.toLowerCase() === "enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="container py-5 flex items-center justify-between">
        <Link to={paths.thoughts.root}>
          <Button className="size-9 p-0">
            <LucideHome size={18} />
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Button>
            <LucideX size={14} /> Cancel
          </Button>

          <Button>
            <LucideSave size={14} /> Save
          </Button>
        </div>
      </div>

      <div className="container max-w-4xl py-5">
        <h1
          contentEditable
          className="focus:outline-none text-3xl font-bold mb-5"
          onKeyDown={handleKeyDown}
        >
          Hello World
        </h1>

        <EditableSection />
      </div>
    </>
  );
};

export default ThoughtsDetailsPage;
