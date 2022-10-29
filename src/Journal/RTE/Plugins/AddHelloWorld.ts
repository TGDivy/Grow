import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $createTextNode } from "lexical";
import { $getRoot } from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";

interface props {
  textToAdd?: string;
}

export default function AddHelloWorldPlugin({ textToAdd }: props) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (textToAdd) {
      editor.update(() => {
        // Get the RootNode from the EditorState
        const root = $getRoot();
        const text = root.getTextContent();
        if (!text.includes(textToAdd)) {
          const headingNode = $createHeadingNode("h1");
          const textNode = $createTextNode(textToAdd);
          textNode.setMode("token");
          headingNode.append(textNode);

          const lastChild = root.getLastChild();
          if (lastChild?.getTextContent() === "") {
            lastChild.insertBefore(headingNode);
          } else {
            lastChild?.insertAfter(headingNode);
          }
        }
      });
    }
  }, [editor, textToAdd]);
  return null;
}
