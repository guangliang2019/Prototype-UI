import { defineComponent, h } from 'vue';

const TestVueComponent = defineComponent({
  setup() {
    const message = 'Hello world!';

    const content = h(
      'div',
      {
        class: 'text-2xl',
        onClick: () => {
          console.log('clicked');
        },
      },
      message
    );
    return () => content;
  },
});

export default TestVueComponent;
