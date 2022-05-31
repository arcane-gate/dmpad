// import React from "react";
// import { Editor, Range } from "@tiptap/react";

// // import Icon from "../../components/Icon";

// const DDBImportExtension = {
//   slash: {
//     title: "import from ddb",
//     element: (
//       <span>
//         {/* <Icon name="DragonHead" />  */}
//         Import from DDB
//       </span>
//     ),
//     command: (props) => {
//       props.editor.chain().focus();
//       window.editor = props.editor;
//       const event = new CustomEvent("ddbImport", { detail: props });
//       document.dispatchEvent(event);
//     },
//     allow: ({ editor, range }: { editor: Editor; range: Range }) => {
//       return editor.can().insertContentAt(range, { type: "statBlock" });
//     },
//   },
// };

// export default DDBImportExtension;

export default {};
