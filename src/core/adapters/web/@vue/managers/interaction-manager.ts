export const InteractionManager = (element: HTMLElement, targetElement: HTMLElement) => {
  const Element: HTMLElement = element;
  const TargetElement: HTMLElement = targetElement;

  return {
    focus: () => {
      TargetElement.focus();
    },
    blur: () => {
      TargetElement.blur();
    },
    click: () => {
      TargetElement.click();
    },
  };
};
