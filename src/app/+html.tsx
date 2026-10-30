import { ScrollViewStyleReset } from "expo-router/html";
import { PropsWithChildren } from "react";

import { Colors } from "@/constants/colors";

const globalStyles = `
html, body, #root {
  background-color: ${Colors.background};
  color: ${Colors.text};
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
::selection {
  background-color: ${Colors.accentSoft};
  color: ${Colors.accent};
}
:focus {
  outline: none;
}
[role="button"]:focus-visible {
  outline: 2px solid ${Colors.accent};
  outline-offset: 3px;
}
`;

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Pick a secret number and let the computer guess it with your higher or lower hints."
        />
        <meta name="theme-color" content={Colors.background} />
        <meta name="color-scheme" content="dark" />
        <title>Guess My Number</title>
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
