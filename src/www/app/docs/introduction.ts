import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component/interface';

class DocIntroduction extends DocComponent {
  protected _doc: Doc = {
    title: 'Introduction',
    id: 'docs-introduction',
    desc: 'A UI component generation solution that starts from the essence of interaction',
    route: ['Docs', 'introduction'],
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
        title: 'How to use',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `At this stage, you can directly package the website's JS and CSS files and include them in your project. In other words, it's not ready for use yet.
            
            In the future, a CLI will be used to write components directly into your project.
            
            If you need to use it now, you can directly take the project source code.
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
        title: 'Project Milestones',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `
            Phase One: First, clarify the Prototype syntax. The initial platforms chosen for implementation are Web Component and pure JavaScript, followed by popular web frontend frameworks like React. We will also improve the documentation site and refine the user experience.

            Phase Two: Adapt to other platforms like Qt and Flutter. Meanwhile, we will expand Prototype's capabilities and provide more prototype-based design language themes.

            Currently in the early stages of Phase One. If you share similar ideas with us, you're welcome to contribute.
            `,
          },
        ],
      },
    ],
  };
}

customElements.define('doc-introduction', DocIntroduction);
