import React, { FC, useEffect, useMemo } from "react";
import "./styles.css";

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { $createParagraphNode, $getRoot, CLEAR_EDITOR_COMMAND } from "lexical";
import useThemeStore from "../../Common/Stores/ThemeStore";
import AddHelloWorldPlugin from "./Plugins/AddHelloWorld";
import CodeHighlightPlugin from "./Plugins/CodeHighlightPlugin";
import ListMaxIndentLevelPlugin from "./Plugins/ListMaxIndentLevelPlugin";
import OnChangeMarkdownPlugin from "./Plugins/OnChangeMarkdownPlugin";
import ToolbarPlugin from "./Plugins/ToolbarPlugin";
import exampleTheme from "./themes/ExampleTheme";

interface props {
  text: string;
  setText: any;
  textToAdd?: string;
  noToolbar?: boolean;
  readonly?: boolean;
  clear?: boolean;
  setClear?: any;
}

interface clearPLuginProps {
  clear?: boolean;
  setClear?: any;
}
export function ActionsPlugin(props: clearPLuginProps) {
  const [editor] = useLexicalComposerContext();

  const MandatoryPlugins = useMemo(() => {
    return <ClearEditorPlugin />;
  }, []);

  useEffect(() => {
    if (props.clear) {
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
      props.setClear(false);
    }
  }, [props.clear]);

  return <>{MandatoryPlugins}</>;
}

const RTE: FC<props> = ({
  text,
  setText,
  textToAdd,
  noToolbar,
  readonly: notEditable,
  clear,
  setClear,
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
    editorState: () => {
      let str = (text || "").replace(/\n\n<br>\n/g, "\n");

      // If we still have br tags, we're coming from Slate, apply
      // Slate list collapse and remove remaining br tags
      // https://github.com/facebook/lexical/issues/2208
      if (str.match(/<br>/g)) {
        str = str.replace(/^(\n)(?=\s*[-+\d.])/gm, "").replace(/<br>/g, "");
      }

      str = str
        // Unescape HTML characters
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

      if (!str) {
        // if string is empty and this is not an update
        // don't bother trying to $convertFromMarkdown
        // below we properly initialize with the correct state allowing for
        // AutoFocus to work (as there is state to focus on), which works better
        // than $convertFromMarkdownString('')
        const root = $getRoot();
        const paragraph = $createParagraphNode();
        root.append(paragraph);
        return;
      }

      $convertFromMarkdownString(str, TRANSFORMERS);
    },

    theme: exampleTheme,
    // Any custom nodes go here
  };
  const colors = useThemeStore((state) => state.colors);

  const onChange = (editorState: any) => {
    // console.log(JSON.stringify(editorState), typeof editorState);
    setText(editorState);
  };

  useEffect(() => {
    if (text) {
      // const editorState = $convertFromMarkdownString(text, TRANSFORMERS);
      // setText(editorState);
    }
  }, [text]);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        {!noToolbar && !notEditable ? <ToolbarPlugin colors={colors} /> : null}
        <div
          className="editor-inner"
          style={{
            backgroundColor: "transparent",
            padding: 0,
          }}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                style={{
                  color: colors.onSurfaceVariant,
                }}
              />
            }
            placeholder={<div className="editor-placeholder">Aa</div>}
          />
          <ClearEditorPlugin />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin matchers={[]} />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangeMarkdownPlugin
            onChange={onChange}
            transformers={TRANSFORMERS}
          />
          <ActionsPlugin clear={clear} setClear={setClear} />
          <AddHelloWorldPlugin
            textToAdd={textToAdd}
            color={colors.onSurfaceVariant}
          />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default RTE;
