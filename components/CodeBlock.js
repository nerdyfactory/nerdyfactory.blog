import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

// Supported languages
import go from "react-syntax-highlighter/dist/cjs/languages/prism/go";
import diff from "react-syntax-highlighter/dist/cjs/languages/prism/diff";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import docker from "react-syntax-highlighter/dist/cjs/languages/prism/docker";

// Theme for sytax
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/material-oceanic";

const languages = {
  javascript: "javascript",
  typescript: "typescript",
  diff: "diff",
  jsx: "jsx",
  docker: "docker",
  go: "go",
  bash: "bash",
};

SyntaxHighlighter.registerLanguage(languages.javascript, javascript);
SyntaxHighlighter.registerLanguage(languages.typescript, typescript);
SyntaxHighlighter.registerLanguage(languages.diff, diff);
SyntaxHighlighter.registerLanguage(languages.jsx, jsx);
SyntaxHighlighter.registerLanguage(languages.go, go);
SyntaxHighlighter.registerLanguage(languages.bash, bash);
SyntaxHighlighter.registerLanguage(languages.docker, docker);

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter
      language={languages[language] ? language : languages.javascript}
      style={dracula}
      customStyle={{ fontSize: "15px" }}
      lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
