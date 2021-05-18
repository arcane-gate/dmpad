import CommandList from "./CommandList";
import tippy from "tippy.js";
import "tippy.js/themes/material.css";
import Mention from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import baseSlashCommands from "./slashCommands";

const configureSlashCommand = (extensions) =>
  Mention.configure({
    suggestion: {
      char: "/",
      startOfLine: false,
      command: ({ editor, range, props }) => {
        props.command({ editor, range });
      },
      items: (query) => {
        return [
          ...baseSlashCommands,
          ...extensions
            .filter((extension) => extension.slash)
            .map((extension) => extension.slash)
        ]
          .filter((item) =>
            item.title.toLowerCase().startsWith(query.toLowerCase())
          )
          .slice(0, 10);
      },
      render: () => {
        let reactRenderer;
        let popup;
        return {
          onStart: (props) => {
            reactRenderer = new ReactRenderer(CommandList, {
              props,
              editor: props.editor
            });

            popup = tippy("body", {
              getReferenceClientRect: props.clientRect,
              appendTo: () => document.body,
              content: reactRenderer.element,
              showOnCreate: true,
              interactive: true,
              trigger: "manual",
              placement: "bottom-start"
            });
          },
          onUpdate(props) {
            reactRenderer.updateProps(props);

            popup[0].setProps({
              getReferenceClientRect: props.clientRect
            });
          },
          onKeyDown(props) {
            return reactRenderer.ref?.onKeyDown(props);
          },
          onExit() {
            if (popup && popup[0]) popup[0].destroy();
            if (reactRenderer) reactRenderer.destroy();
          }
        };
      }
    }
  });

const ExtensionManager = (extensions) => {
  const SlashCommands = configureSlashCommand(extensions);
  const plugins = extensions.map((extension) => {
    if (extension.node) {
      return extension.node;
    }
    return extension;
  });
  return [...plugins, SlashCommands];
};

export default ExtensionManager;
