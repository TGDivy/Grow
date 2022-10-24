import React from "react";
import useJournalStore from "../Common/Stores/DailyJournalStore";
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
import { TRANSFORMERS } from "@lexical/markdown";
import exampleTheme from "./themes/ExampleTheme";
import ToolbarPlugin from "./Plugins/ToolbarPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import CodeHighlightPlugin from "./Plugins/CodeHighlightPlugin";
import ListMaxIndentLevelPlugin from "./Plugins/ListMaxIndentLevelPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const ReflectGrateful = () => {
  // A place to write down what you're grateful for.
  const grateful = useJournalStore((state) => state.grateful);
  const setGrateful = useJournalStore((state) => state.setGrateful);
  const editorConfig = {
    namespace: "MyEditor",
    // Handling of errors during update
    onError(error: any) {
      console.error(error);
    },
    editorState: grateful,
    theme: exampleTheme,
    // Any custom nodes go here
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
    ],
  };

  const onChange = (value: any) => {
    console.log(JSON.stringify(value));
    setGrateful(JSON.stringify(value));
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={
              <div className="editor-placeholder">Enter some rich text...</div>
            }
          />
          <OnChangePlugin onChange={onChange} ignoreSelectionChange />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin matchers={[]} />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default ReflectGrateful;
