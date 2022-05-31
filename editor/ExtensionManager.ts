import CommandList from "./CommandList";
import tippy from "tippy.js";
import "tippy.js/themes/material.css";
import Mention from "@tiptap/extension-mention";
import { Extension, ReactRenderer } from "@tiptap/react";
import baseSlashCommands from "./slashCommands";
import { PluginKey } from "prosemirror-state";

// type PadExtension = Extension & {
//   slash: 
// }

const configureSlashCommand = (extensions) =>
  Mention.configure({
    suggestion: {
      pluginKey: new PluginKey("slash"),
      char: "/",
      startOfLine: false,
      command: ({ editor, range, props }) => {
        props.command({ editor, range });
      },
      items: ({query}) => {
        return [
          ...baseSlashCommands,
          ...extensions
            .filter((extension) => extension.slash)
            .map((extension) => extension.slash),
        ].filter((item) =>
          item.title.toLowerCase().startsWith(query.toLowerCase())
        );
      },
      render: () => {
        let reactRenderer: ReactRenderer;
        let popup;
        return {
          onStart: (props) => {
            reactRenderer = new ReactRenderer(CommandList, {
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
          onKeyDown(props) {
            return reactRenderer.ref?.onKeyDown(props);
          },
          onExit() {
            if (popup && popup[0]) popup[0].destroy();
            if (reactRenderer) reactRenderer.destroy();
          },
        };
      },
    },
  });

  type PadExtension = Extension & {
    requires: Extension[],
    node: () => Extension | Extension
  }

const ExtensionManager = (...extensions: PadExtension[]): Extension[] => {
  const SlashCommands = configureSlashCommand(extensions);
  const plugins = new Set<Extension>();
  extensions.forEach((extension) => {
    if (extension.requires) {
      extension.requires.forEach((req) => {
        plugins.add(req);
      });
    }
    if (extension.node) {
      if (typeof extension.node === "function") {
        plugins.add(extension.node());
      } else {
        plugins.add(extension.node);
      }
    } else {
      plugins.add(extension);
    }
  });
  return [SlashCommands, ...Array.from(plugins)];
};

export default ExtensionManager;
