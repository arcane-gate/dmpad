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

export const emptyState = createDocState({
  type: "doc",
  content: [],
});

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
              skin: "",
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
              skin: "",
              native: "📓",
            },
          },
        },
        { type: "text", text: "." },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [
        {
          type: "text",
          text: "P.S. This whole document is editable! Click somewhere and start taking notes (dmpad saves all your changes locally)!",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Plan your sessions." }],
    },
    {
      type: "actionItem",
      content: [
        {
          type: "text",
          text: "Use action items to call out notes you need to remember next time.",
        },
      ],
    },
    { type: "paragraph" },
    {
      type: "statBlock",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Track Stats" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [{ type: "italic" }],
              text: "Traumatic Backgrounder, Lawful Weird",
            },
          ],
        },
        { type: "paragraph" },
        {
          type: "attributeBlock",
          content: [
            {
              type: "attributeRow",
              content: [
                {
                  type: "attributeCell",
                  attrs: { name: "STR" },
                  content: [{ type: "text", text: "25" }],
                },
                {
                  type: "attributeCell",
                  attrs: { name: "DEX" },
                  content: [{ type: "text", text: "25" }],
                },
                {
                  type: "attributeCell",
                  attrs: { name: "CON" },
                  content: [{ type: "text", text: "18" }],
                },
                {
                  type: "attributeCell",
                  attrs: { name: "INT" },
                  content: [{ type: "text", text: "17" }],
                },
                {
                  type: "attributeCell",
                  attrs: { name: "WIS" },
                  content: [{ type: "text", text: "24" }],
                },
                {
                  type: "attributeCell",
                  attrs: { name: "CHA" },
                  content: [{ type: "text", text: "35" }],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Actions" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [{ type: "bold" }, { type: "italic" }],
              text: "Rock your next session. ",
            },
            { type: "text", text: "Use " },
            { type: "text", marks: [{ type: "bold" }], text: "dmpad" },
            {
              type: "text",
              text: " to rock your next session. May or may not make you the best DM ever.",
            },
          ],
        },
        { type: "heading", attrs: { level: 1 } },
      ],
    },
    { type: "heading", attrs: { level: 4 } },
    {
      type: "descriptiveText",
      content: [
        {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Use Descriptive Text" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Write something to read to your players - describe an item, location, NPC, whatever!",
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Track your improv." }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Create NPCs, items, locations, monsters and more on the fly, then access them again with a robust mentions system. Search your creations at any time, get a timeline of the previous interactions they’ve had, and link them to secrets and clues easily.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", marks: [{ type: "italic" }], text: "Coming soon." },
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
      content: [{ type: "text", text: "And even more on the way…" }],
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
