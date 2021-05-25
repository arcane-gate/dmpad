const createDocState = (doc) => {
  return {
    visualLayerContent: [
      // {
      //   id: "oIHolA4AcN4HCpbkSIB5P",
      //   position: {
      //     left: 1111,
      //     top: 166,
      //     windowWidth: 1676,
      //     windowHeight: 877,
      //   },
      //   type: "sticker",
      //   src: "https://imgur.com/bOWzbsl.png",
      // },
    ],
    content: doc,
  };
};

export default createDocState({
  type: "doc",
  content: [
    {
      type: "title",
      content: [
        { type: "text", text: "Welcome to " },
        {
          type: "emoji",
          attrs: {
            emoji: {
              id: "crossed_swords",
              name: "Crossed Swords",
              short_names: ["crossed_swords"],
              colons: ":crossed_swords:",
              emoticons: [],
              unified: "2694-fe0f",
              skin: null,
              native: "⚔️",
            },
          },
        },
        { type: "text", text: " dmpad" },
      ],
    },
    {
      type: "heading",
      attrs: { level: 1 },
      content: [
        { type: "text", text: "A tool for creating better TTRPG notes " },
        {
          type: "emoji",
          attrs: {
            emoji: {
              id: "notebook",
              name: "Notebook",
              short_names: ["notebook"],
              colons: ":notebook:",
              emoticons: [],
              unified: "1f4d3",
              skin: null,
              native: "📓",
            },
          },
        },
        { type: "text", text: "." },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Plan your sessions." }],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Track your improv." }],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        {
          type: "text",
          text: "Find that pesky NPC you forgot even existed (even if you party didn’t)",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 1 },
      content: [{ type: "text", text: "Awesome features like…" }],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Dice Notation" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Type something like this 1d20+15 and click it to roll a die!",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Keyboard Commands" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", marks: [{ type: "code" }], text: "⌘ + B" },
        { type: "text", text: " = " },
        { type: "text", marks: [{ type: "bold" }], text: "bold" },
      ],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", marks: [{ type: "code" }], text: "⌘ + I" },
        { type: "text", text: " = " },
        { type: "text", marks: [{ type: "italic" }], text: "italic" },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [{ type: "italic" }],
          text: "more coming soon!",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Slash Commands" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Try typing a " },
        { type: "text", marks: [{ type: "code" }], text: "/" },
        { type: "text", text: " and selecting a command!" },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [{ type: "italic" }],
          text: "more coming soon!",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Import from D&D Beyond" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [{ type: "italic" }],
          text: "work in progress, but coming along well!",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 1 },
      content: [
        {
          type: "text",
          text: "Things that aren’t built yet, but are on the way…",
        },
      ],
    },
    {
      type: "checkList",
      content: [
        {
          type: "checkItem",
          attrs: { checked: true },
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Checklists" }],
            },
          ],
        },
        {
          type: "checkItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Modal styles" }],
            },
          ],
        },
        {
          type: "checkItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Stat Blocks/Imports" }],
            },
          ],
        },
        {
          type: "checkItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Modrons - simple widgets that respond to data changes in the document",
                },
              ],
            },
          ],
        },
        {
          type: "checkItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Multiple documents" }],
            },
          ],
        },
        {
          type: "checkItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Tab key binding" }],
            },
          ],
        },
        {
          type: "checkItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Paid accounts" }],
            },
            {
              type: "checkList",
              content: [
                {
                  type: "checkItem",
                  attrs: { checked: false },
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "Saved notes" }],
                    },
                  ],
                },
                {
                  type: "checkItem",
                  attrs: { checked: false },
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "Premium features" }],
                    },
                  ],
                },
                {
                  type: "checkItem",
                  attrs: { checked: false },
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        { type: "text", text: "Patron-based payment system?" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
