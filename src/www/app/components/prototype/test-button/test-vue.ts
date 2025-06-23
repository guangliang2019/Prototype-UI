import { definePrototype } from '@/core';
import VueAdapter from '@/core/adapters/web/@next-vue';
import { defineComponent, h, ref, onMounted } from 'vue';
// import { TestVueButton } from '@/components/prototype/test-vue-button';

const testPrototype = VueAdapter(
  definePrototype({
    name: 'test-vue',
    setup: (p) => {

      p.event.on('click', () => {
        console.log('[Vue Adapter Test] clicked')
      })

      return (renderer) => {
        const r = renderer.createElement;
        return r('div', { class: 'bg-indigo-500 h-12 w-12' }, ['click me']);
      };
    },
  })
);

const TestVueComponent = defineComponent({
  setup() {
    const buttonText = ref('初始文本');
    const buttonVariant = ref('primary');
    const isDisabled = ref(false);
    const lifecycleLogs = ref<string[]>([]);
    // 测试生命周期
    onMounted(() => {
      console.log('Vue 组件已挂载');
    });

    return () => h('div', { class: 'space-y-4 p-4' }, [h(testPrototype)]);
  },
});

export default TestVueComponent;
