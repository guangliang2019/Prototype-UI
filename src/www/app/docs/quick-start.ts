import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component/interface';

class DocQuickStart extends DocComponent {
  protected _doc: Doc = {
    title: 'Quick Start',
    id: 'docs-quick-start',
    desc: 'To use it, to contribute, whatever the purpose, we need to get it running first, which is fortunately very simple',
    route: ['Docs', 'Quick Start'],
    links: [],
    sections: [
      {
        title: 'Installation and Running',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `
            Since there is no CLI tool to help you install yet, we recommend cloning the project source code and running it locally

            \`\`\`bash
git clone https://github.com/guangliang2019/Prototype-UI.git
            \`\`\`

            Make sure you have [Node.js 18](https://nodejs.org) or higher installed, then run the following commands in the directory containing package.json

            \`\`\`bash
npm install
            \`\`\`

            \`\`\`bash
npm run dev
            \`\`\`

            If successful, you will be able to see the Prototype UI documentation site at [http://localhost:5173/](http://localhost:5173/)
            `,
          },
        ],
      },
      {
        title: 'Preparation Before Use',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `
            If you want to use the components provided by Prototype UI, such as Web Component style Headless \`Button\` or Shadcn theme \`Button\`

            You can directly copy the \`prototype\` and \`shadcn\` directories from the project's \`src/components\` directory to your project. Additionally, you need to copy the \`src/core\` directory to your project

            \`src/core/adapters\` includes various types of adapters. It is recommended to delete adapters that your project does not use. For example, if you only use Web Component style components, then you only need to keep the \`src/core/adapters/web/@web-component\` directory

            If you don't delete unnecessary adapters, it may cause your project size to increase (adapters have no dependencies between them, it's recommended to decide which to keep based on your project)

            In the future, we will provide a CLI tool to help you write components directly into your project, but for now, you'll have to handle it manually
            `,
          },
        ],
      },
      {
        title: 'Prototype and Component',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `
            The design philosophy of Prototype UI is \`Adapter(Prototype) => Component\`, so you'll see code like this in the \`src/components\` directory

            \`\`\`ts
export const PrototypeButtonPrototype = definePrototype({
  name: 'prototype-button',
  setup: asButton,
});

export const PrototypeButton = WebComponentAdapter(PrototypeButtonPrototype);
            \`\`\`
            
            In the above example, we define a prototype \`PrototypeButtonPrototype\`, then use \`WebComponentAdapter\` to adapt it into a Web Component \`PrototypeButton\`

            In the \`setup\` function of the prototype \`PrototypeButtonPrototype\`, we use the \`asButton\` function, which adapts the prototype to button behavior

            We will explain the \`setup\` function and \`asButton\` function in detail later

            The final output \`PrototypeButton\` component has APIs and behavior consistent with native Web Components. It can be inherited, extended, and any Web Component features can be used

            The components in the current documentation site are developed based on prototypes-generated Web Components, rather than using the prototype and adapter pattern from start to finish, because we need to ensure that the output components are truly consistent with the developer experience of native components
            `,
          },
        ],
      },
      {
        title: 'setup Function',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `
            \`setup\` is the exact description of prototype behavior, representing the common logic part of implementing the same interactive component across any platform

            The \`asButton\` used earlier is one of the default setup behaviors provided by Prototype UI, using them is not mandatory

            The \`setup\` function has one parameter, usually called \`p\`, which is the "remote control" of the current prototype. What you need to do is use it in the \`setup\` function to describe the behavior of the current prototype

            For example, a custom button that prints "Hello Prototype UI" to the console when clicked

            \`\`\`ts
const MyButtonPrototype = definePrototype({
  name: 'my-button',
  setup: (p) => {
    p.event.on('click', () => {
      p.debug.log('Hello Prototype UI')
    })
  },
});
            \`\`\`

            In the above code, we use \`p.event.on\` to listen for click events and \`p.debug.log\` to print logs

            \`p\` has many capabilities, which we will gradually explore
            `,
          },
        ],
      },
      {
        title: "More About p's Capabilities",
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `
            \`p\`'s functionality is divided into several major parts. This section might contain a lot of information. If it's difficult to understand at first, you can skip it and come back to consult when needed

            - \`p.event\` Used to listen for interaction events, the only way for components to interact with end users
            - \`p.debug\` Used for printing logs, recording performance, enabling debugging features, etc. This feature is very useful during development

            - \`p.props\` Used to set, modify, and listen to component property parameters, such as button style types (primary button, secondary button, border button, ghost button, danger button)
            - \`p.state\` Used to set and listen to component states. Here, states refer to states similar to animation state machines, such as button disabled state, active state, focus state, etc.
            - \`p.context\` Used to provide, listen to, and obtain component context. Context refers to data shared between different parts of a component
            - \`p.lifecycle\` Used to execute custom logic at specified component lifecycle stages

            - \`p.view\`'s functionality is divided into two categories, mainly related to rendering scheduling and elements
              - Rendering scheduling related, such as requesting view updates, forcing view updates
              - Element related, such as obtaining runtime rendering elements, comparing element positions, obtaining specific element parameters, etc.

            Let's take an example, such as a \`Tabs\` component, which consists of \`TabsTrigger\` and \`TabsContent\` two parts
            
            The logic is that when \`TabsTrigger\` is clicked, add the \`data-selected\` attribute to the \`TabsContent\` that carries the same value as \`TabsTrigger\`, making it convenient for subsequent custom styling

            \`\`\`ts
const MyTabsContext = createContext<{value: string; changeTab: (value: string) => void}>('my-tabs')

const MyTabsPrototype = definePrototype({
 
  name: 'my-tabs',
  setup: (p) => {
    p.props.define({
      defaultValue: ""
    })

    p.context.provide(MyTabsContext, (updateContext) => {
      const props = p.props.get()
      
      return {
        value: props.defaultValue,
        changeTab: (value: string) => {
          updateContext({
            value
          })
        }
      }
    })
  },
});

const MyTabsTriggerPrototype = definePrototype({
  name: 'my-tabs-trigger',
  setup: (p) => {
    p.props.define({
      value: ""
    })
    const selected = p.state.define(false, 'data-selected')
    
    p.context.watch(MyTabsContext, (context, changedKeys) => {
      if (changedKeys.includes('value')) {
        selected.set(context.value === p.props.get().value)
      }
    })

    p.event.on('click', () => {
      const context = p.context.get(MyTabsContext)
      const props = p.props.get()
      context.changeTab(props.value)
    })
  }
});

const MyTabsContentPrototype = definePrototype({
  name: 'my-tabs-content',
  setup: (p) => {
    p.props.define({
      value: ""
    })
    const selected = p.state.define(false, 'data-selected')
    p.context.watch(MyTabsContext, (context, changedKeys) => {
      if (changedKeys.includes('value')) {
        selected.set(context.value === p.props.get().value)
      }
    })
  }
});
            \`\`\`
            `,
          },
        ],
      },
      {
        title: 'Return Value of setup',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `
            In the previous examples, we mainly demonstrated the usage of \`p\` in the \`setup\` function body. Actually, the return value of the \`setup\` function is also very important

            The return value of the \`setup\` function is an object with 4 components, all of which are optional, with \`render\` and \`expose\` being more commonly used

            - \`render\` The component's rendering template, default is to use the current component as a slot. Using custom rendering functions can control the rendering structure
            - \`expose\` APIs exposed by the current component to the outside, these APIs can be easily used externally
            - \`states\` If the current \`setup\` function is used as a hook function, which internal states can be controlled by external components
            - \`actions\` If the current \`setup\` function is used as a hook function, which internal states can be controlled by external components
            
            \`\`\`ts
const MyTabsContext = createContext<{value: string; changeTab: (value: string) => void}>('my-tabs')

const MyTabsPrototype = definePrototype({
  name: 'my-tabs',
  setup: (p) => {
    p.props.define({
      defaultValue: ""
    })

    p.context.provide(MyTabsContext, (updateContext) => {
      const props = p.props.get()
      return {
        value: props.defaultValue,
        changeTab: (value: string) => {
          updateContext({
            value
          })
        }
      }
    })

    return {
      exposes: {
        changeTab: (value: string) => {
          p.context.get(MyTabsContext).changeTab(value)
        }
      }
    }
  },
});
            \`\`\`

            After adding exposes, we can use the \`changeTab\` function to control the component's internal state from outside the component

            Taking Web Component as an example, you can directly get the \`Tabs\` root component's DOM element, then directly call the \`changeTab\` method to control Tabs switching

            Like this:
            \`\`\`ts
const tabs = document.querySelector('my-tabs')
tabs.changeTab('tab-1')
            \`\`\`

            Different \`Adapters\` handle \`exposes\` differently, but they all try to keep the usage experience close to the target technical solution
            `,
          },
        ],
      },
    ],
  };
}

customElements.define('doc-quick-start', DocQuickStart);
