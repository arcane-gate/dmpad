import React, { useRef, useState, useEffect, ReactElement } from "react";
import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import { Emoji, EmojiData, Picker } from "emoji-mart";
import Mention from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import "tippy.js/themes/material.css";
import "emoji-mart/css/emoji-mart.css";
import { PluginKey } from "prosemirror-state";

const MojiPicker = ({ command }: { command: (emoji: EmojiData) => void }) => {
  const addEmoji = (emoji: EmojiData) => {
    command(emoji);
  };
  return <Picker title="dmpad" autoFocus={true} onSelect={addEmoji} />;
};

type EmojiNodeRenderProps = {
  node: {
    attrs: {
      emoji: EmojiData;
    };
  };
};

const EmojiNodeRender = (props: EmojiNodeRenderProps) => {
  const { emoji } = props.node.attrs;
  const element = useRef(null);
  const [size, setSize] = useState(24);
  useEffect(() => {
    const elem = element.current;
    if (elem) {
      setTimeout(() => {
        const styles = window.getComputedStyle(elem);
        const fontSize = styles.getPropertyValue("font-size");
        const newSize = Number(fontSize.replace("px", ""));
        setSize(newSize || 24);
      }, 0);
    }
  }, [element]);
  const emote = Emoji({
    html: true,
    set: "apple",
    emoji: emoji,
    size,
  });
  return (
    <NodeViewWrapper as="span">
      <span ref={element} contentEditable={false}>
        {emote}
      </span>
    </NodeViewWrapper>
  );
};

export const EmojiNode = {
  node: Node.create({
    name: "emoji",
    group: "inline",
    atom: true,
    inline: true,

    addAttributes() {
      return {
        emoji: {
          default: {},
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: "emoji",
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return ["emoji", mergeAttributes(HTMLAttributes), 0];
    },

    addNodeView() {
      return ReactNodeViewRenderer(EmojiNodeRender);
    },
  }),
};

const Emote = Mention.configure({
  suggestion: {
    pluginKey: new PluginKey("emote"),
    char: ":",
    startOfLine: false,
    command: ({ editor, range, props }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent({ type: "emoji", attrs: { emoji: props } })
        .run();
    },
    render: () => {
      let reactRenderer: ReactRenderer<HTMLDivElement>;
      let popup: TippyInstance[];
      return {
        onStart: (props) => {
          reactRenderer = new ReactRenderer(MojiPicker, {
            props,
            editor: props.editor,
          });

          popup = tippy("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: reactRenderer.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
          });
        },
        onUpdate(props) {
          reactRenderer.updateProps(props);

          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },
        // onKeyDown(props) {
        //   return reactRenderer.ref?.onKeyDown(props);
        // },
        onExit() {
          if (popup && popup[0]) popup[0].destroy();
          if (reactRenderer) reactRenderer.destroy();
        },
      };
    },
  },
});

export default Emote;
