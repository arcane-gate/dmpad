import styled from 'styled-components';

const StyledEditor = styled.div`
.editor {
  width: 100%;
  padding: 5vh 5vw;
  overflow-x: hidden;
  font-family: var(--editor-font);
  outline: none;

  > .react-renderer .react-renderer {
    // non-top level renderer elements should behave as their children
    display: contents;
  }

  &.ProseMirror {
    > *,
    > .react-renderer > * {
      width: 100%;
      max-width: var(--reference-size);
      margin: 0 auto;
    }

    > * + *,
    > .react-renderer + * {
      margin-top: 0.75em;
    }

    ul,
    ol {
      padding: 0 16px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }

    code {
      display: inline-flex;
      align-items: center;
      font-family: monospace;
      font-weight: 600;
      line-height: 100%;
      padding: 2px 4px;
      border-radius: 4px;
      background-color: rgba(color("red"), 0.2);
      color: var(--c-red);
      border: 1px solid var(--c-red);
    }

    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: "JetBrainsMono", monospace;
      padding: 16px;
      border-radius: 4px;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8em;
      }
    }

    img {
      max-width: 100%;
      height: auto;
    }

    blockquote {
      padding-left: 16px;
      border-left: 2px solid rgba(#0d0d0d, 0.1);
    }

    hr {
      border: none;
      border-top: 2px solid rgba(#0d0d0d, 0.1);
      margin: 32px 0;
    }
  }
}
}
`;

export default StyledEditor;