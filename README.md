# Prototype UI

## Overview

Prototype UI is a headless UI library powered by Web Components, drawing inspiration from shadcn/ui. Rather than traditional package distribution, this project uniquely integrates reusable component source code, complete with comments and documentation, directly into your project directory via the CLI.

Website: [https://prototype-ui.dev](https://prototype-ui.dev)

## Features

- **Non-Package Distribution**: Instead of traditional package installation, components are seamlessly integrated into your project through our CLI, promoting a more tailored development experience.
- **Customizable**: Full code transparency allows you to modify and adapt components to meet your specific requirements.
- **Accessibility**: Committed to the latest accessibility standards, ensuring usability for all users.
- **Lightweight**: The entire library contributes less than 10 KB to your project, emphasizing efficiency and performance.

## Note

The code is provided "as is" for maximum flexibility in use and integration into various projects.

## Contributing

Contributions are encouraged. Although the Web Components ecosystem may not be as extensive as those for frameworks like React, Vue, or Lit, Prototype UI strives to emulate best practices from these established communities. We convert and reimplement functionalities from these frameworks into Web Components, diligently crediting original developers and their contributions.

## Development

Run the project locally with `npm run dev`. For optimal performance, Node version 18 or higher is recommended.

## Guangliang's Note

While the library employs a CLI-based approach for adding source code directly, an alternative method involves using a script tag to import the entire library. This method is also highly efficient, with the total projected output size expected to be under 30 KB.