import { defineComponent, h, ref, onMounted } from 'vue';
import { TestVueButton } from '@/components/prototype/test-vue-button';

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

    // 测试 props 变化
    const updateProps = () => {
      buttonText.value = '更新后的文本';
      buttonVariant.value = 'secondary';
      isDisabled.value = true;
    };

    return () => h('div', { class: 'space-y-4 p-4' }, [
      // 测试按钮
      h('div', { class: 'flex flex-wrap gap-4' }, [
        h(TestVueButton, {
          variant: buttonVariant.value,
          disabled: isDisabled.value,
          onClick: () => {
            console.log('按钮被点击');
            updateProps();
          }
        }, '111')
      ]),11,

      // 显示当前 props 状态
      h('div', { class: 'mt-4 p-4 bg-gray-100 rounded' }, [
        h('h3', { class: 'font-bold mb-2' }, '当前 Props 状态123：'),
   
      ])
    ]);
  },
});

export default TestVueComponent;
