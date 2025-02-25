// lifecycle
export const connectedCallbacks = Symbol('hooked-web-component connectedCallbacks');
export const disconnectedCallbacks = Symbol('hooked-web-component disconnectedCallbacks');
export const createdCallbacks = Symbol('hooked-web-component createdCallbacks');
export const attributeListeners = Symbol('hooked-web-component attributeListeners');

// props
export const initProps = Symbol('hooked-web-component initProps');

// flags
export const canUseHooksFlag = Symbol('hooked-web-component canUseHooksFlag');

// context
export const contextListeners = Symbol('hooked-web-component contextListeners');
export const provideValues = Symbol('hooked-web-component provideValues');
export const provideKeys = Symbol('hooked-web-component provideKeys');
export const listenKeys = Symbol('hooked-web-component listenKeys');
export const listenValues = Symbol('hooked-web-component contextValues');
export const handleRequestContext = Symbol('hooked-web-component handleRequestContext');
export const requestContext = Symbol('hooked-web-component requestContext');
export const setContext = Symbol('hooked-web-component setContext');
export const updateContext = Symbol('hooked-web-component updateContext');

// render
export const renderContent = Symbol('hooked-web-component renderContent');
