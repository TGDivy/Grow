import React, { FC, useEffect } from "react";
import "./styles.css";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import AddHelloWorldPlugin from "./Plugins/AddHelloWorld";
import { TRANSFORMERS } from "@lexical/markdown";
import exampleTheme from "./themes/ExampleTheme";
import ToolbarPlugin from "./Plugins/ToolbarPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import CodeHighlightPlugin from "./Plugins/CodeHighlightPlugin";
import ListMaxIndentLevelPlugin from "./Plugins/ListMaxIndentLevelPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import useThemeStore from "../../Common/Stores/ThemeStore";

interface props {
  text: string;
  setText: any;
  textToAdd?: string;
  noToolbar?: boolean;
  readonly?: boolean;
}

const RTE: FC<props> = ({
  text,
  setText,
  textToAdd,
  noToolbar,
  readonly: notEditable,
}) => {
  const editorConfig = {
    namespace: "MyEditor",
    // Handling of errors during update
    editable: !notEditable,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      HorizontalRuleNode,
    ],
    onError(error: any) {
      console.error(error);
    },
    editorState: text ? text : undefined,

    theme: exampleTheme,
    // Any custom nodes go here
  };
  const colors = useThemeStore((state) => state.colors);

  const onChange = (editorState: any) => {
    setText(JSON.stringify(editorState));
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        {!noToolbar && !notEditable ? <ToolbarPlugin /> : null}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={
              <div className="editor-placeholder">Enter some rich text...</div>
            }
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin matchers={[]} />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <AddHelloWorldPlugin textToAdd={textToAdd} color={colors.primary} />
          <OnChangePlugin onChange={onChange} ignoreSelectionChange />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default RTE;
