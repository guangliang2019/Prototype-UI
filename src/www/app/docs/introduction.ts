import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component/interface';

class DocIntroduction extends DocComponent {
  protected _doc: Doc = {
    title: 'Introduction',
    id: 'docs-introduction',
    desc: 'A UI component generation solution that starts from the essence of interaction',
    route: ['Docs', 'Introduction'],
    links: [],
    sections: [
      {
        title: 'What is this',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `
            This project is named [Prototype UI](https://github.com/guangliang2019/Prototype-UI), a component generation solution based on Prototype.

            Currently in its early stages, it appears to be a Web Component or pure JavaScript version of [Radix UI](https://www.radix-ui.com/). Additionally, the documentation site and component styles are inspired by [shadcn/ui](https://ui.shadcn.com).
            `,
          },
        ],
      },
      {
        title: 'Project Status',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `
            🚧 This project is currently in early development stage.

            ### What's Available
            - Basic Web Component implementation
            - Documentation site (you're looking at it)
            - Core prototype system

            ### What's Coming
            - CLI tool for component installation
            - More component implementations
            - More theme options
            - Framework adapters (React, Vue, etc.)
            `,
          },
        ],
      },
      {
        title: 'Why we do this',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `
            The design philosophy of Prototype UI is \`Adapter(Prototype) => Component\`

            We have used too many technologies to build interfaces, such as React, Vue, Svelte, Solid for the web, native Flutter, Qt, etc. Every time we write UI, we always start with components like Button. We've written Button too many times, yet their interactive essence remains the same.

            Prototype UI hopes to find a balance between interaction and development, seeking a solution that is adaptable enough for all platforms while starting from the essence of interaction.
            
            When the next operating system emerges, we won't need to develop a new set of UI libraries for each design language; when the next design language appears, we won't need to struggle to adapt it to all technical solutions.

            Perhaps when the next interaction system appears, we can have a more reasonable starting point, rather than rewriting Button over and over again.
            `,
          },
        ],
      },
      {
        title: 'Get Involved',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `
            We're in the early stages of development and would love your input!

            ### How to Contribute
            - Star the project on [GitHub](https://github.com/guangliang2019/Prototype-UI)
            - Open issues to discuss ideas or report bugs
            - Submit pull requests for improvements
            - Share your thoughts in discussions

            ### Development Roadmap
            1. Phase One: Web Platform
               - Complete core prototype system
               - Implement basic components
               - Build CLI tool
               - Improve documentation

            2. Phase Two: Cross Platform
               - Add framework adapters
               - Support more platforms
               - Expand design language themes

            ### Current Focus
            - Stabilizing the core prototype system
            - Implementing basic components
            - Building the documentation site
            `,
          },
        ],
      },
    ],
  };
}

customElements.define('doc-introduction', DocIntroduction);
