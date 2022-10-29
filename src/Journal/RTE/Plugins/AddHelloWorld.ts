import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $createParagraphNode, $createTextNode } from "lexical";
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
          textNode.setStyle("color: #ac9172");
          headingNode.append(textNode);

          if (text !== "") {
            // Add a new paragraph node
            const paragraphNode = $createParagraphNode();
            paragraphNode.append(headingNode);
            root.append(paragraphNode);
          }

          const lastChild = root.getLastChild();

          if (lastChild?.getTextContent() === "") {
            lastChild.insertBefore(headingNode);
          } else {
            // lastChild?.insertBefore(lastChild);
            // lastChild?.replaceWith($createHeadingNode("h1"));
            lastChild?.insertAfter(headingNode);
          }
        }
      });
    }
  }, [editor, textToAdd]);
  return null;
}
