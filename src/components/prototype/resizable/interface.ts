import PrototypeResizable from './resizable';
import PrototypeResizableHandle from './resizable-handle';
import PrototypeResizablePanel from './resizable-panel';

export interface PrototypeResizableProps {
  direction: 'horizontal' | 'vertical';
}

export interface PrototypeResizablePanelProps {
  /**
   * eg: '100px', '50%', 'auto', '10rem'
   */
  defaultSize: string;

  minSize?: string;
  maxSize?: string;
}

export interface PrototypeResizableHandleProps {}

export interface PrototypeResizableContext extends Record<string, Object> {
  'prototype-resizable': {
    direction: PrototypeResizableProps['direction'];

    rootRef: PrototypeResizable<any>;
    handleRefs: PrototypeResizableHandle<any>[];
    panelRefs: PrototypeResizablePanel<any>[];
  };
}
