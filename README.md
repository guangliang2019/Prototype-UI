# Prototype UI

## Overview

Prototype UI is a headless UI library built with Web Components, offering a novel approach to component integration. Inspired by shadcn/ui, it bypasses traditional package management by directly incorporating component source code into your project via a CLI. This provides unparalleled customization and control, allowing you to tailor the components directly within your codebase while maintaining a lightweight footprint.

Website: [https://prototype-ui.dev](https://prototype-ui.dev)

## Features

- **Non-Package Distribution**: Instead of traditional package installation, components are seamlessly integrated into your project through our CLI, promoting a more tailored development experience.
- **Customizable**: Full code transparency allows you to modify and adapt components to meet your specific requirements.
- **Accessibility**: Committed to the latest accessibility standards, ensuring usability for all users.
- **Lightweight**: The entire library contributes less than 10 KB to your project, emphasizing efficiency and performance.

## Installation (Working in Progress)

```bash
npx prototype-ui init
# Or for a specific theme:
npx prototype-ui/shadcn init
```

# Usage

```shell
$ npx prototype-ui --help


██████╗ ██████╗  ██████╗ ████████╗ ██████╗
██╔══██╗██╔══██╗██╔═══██╗╚══██╔══╝██╔═══██╗
██████╔╝██████╔╝██║   ██║   ██║   ██║   ██║
██╔═══╝ ██╔══██╗██║   ██║   ██║   ██║   ██║
██║     ██║  ██║╚██████╔╝   ██║   ╚██████╔╝
╚═╝     ╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝
████████╗██╗   ██╗██████╗ ███████╗    ██╗   ██╗██╗
╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝    ██║   ██║██║
   ██║    ╚████╔╝ ██████╔╝█████╗█████╗██║   ██║██║
   ██║     ╚██╔╝  ██╔═══╝ ██╔══╝╚════╝██║   ██║██║
   ██║      ██║   ██║     ███████╗    ╚██████╔╝██║
   ╚═╝      ╚═╝   ╚═╝     ╚══════╝     ╚═════╝ ╚═╝

Usage: prototype-ui [options] [command]

CLI for prototype-ui project

Options:
  -v, --version       Output the current version
  -h, --help          display help for command

Commands:
  init                Initialize a new prototype-ui project
  add <component>     Add a new component to the project
  remove <component>  Remove a component from the project (maybe not safe)
  list                List all components in the project
  help [command]      display help for command
```

## Note

The code is provided "as is" for maximum flexibility in use and integration into various projects.

## Contributing

Contributions are welcome and encouraged. Although the Web Components ecosystem may not be as extensive as those for frameworks like React, Vue, or Lit, Prototype UI strives to emulate best practices from these established communities. We convert and reimplement functionalities from these frameworks into Web Components, diligently crediting original developers and their contributions.

## Development

Run the project locally with `npm run dev`. For optimal performance, Node version 18 or higher is recommended.

## Guangliang's Note

For smaller projects or situations where CLI integration isn't ideal, you can include the entire Prototype UI library via a script tag. This method is also efficient (projected output size under 30KB) and provides a quick way to get started. However, it offers less granular control over individual components. See the documentation for details on script tag integration.
