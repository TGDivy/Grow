import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $createParagraphNode, $createTextNode, LexicalNode } from "lexical";
import { $getRoot } from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createHorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";

interface props {
  textToAdd?: string;
  color?: string;
}

export function $insertNodesBack(
  nodes: Array<LexicalNode>,
  selectStart?: boolean
): boolean {
  const selection = $getRoot().selectStart();
  return selection.insertNodes(nodes, selectStart);
}

export default function AddHelloWorldPlugin({ textToAdd, color }: props) {
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
          textNode.setStyle("color: " + color);
          headingNode.append(textNode);

          if (text !== "") {
            // Add a new paragraph node
            const paragraphNode = $createParagraphNode();
            paragraphNode.append(headingNode);
            root.append(paragraphNode);
          }

          const child = root.getFirstChild();

          if (text !== "") {
            child?.insertBefore($createParagraphNode());
            child?.insertBefore($createHorizontalRuleNode());
          }
          $insertNodesBack([headingNode, $createParagraphNode()]);
        }
      });
    }
  }, [editor, textToAdd]);
  return null;
}
