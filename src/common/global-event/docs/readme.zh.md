# GlobalEvent
addEventListener 的封装，用于监听全局事件，实际只会添加一个 EventListener 事件，性能更好。


```ts
import { GlobalEvent } from 'common/global-event';

GlobalEvent.addListener(('mousemove', e) => {
  console.log(e);
});
```
