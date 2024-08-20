import { ContextConsumer } from '../../../../common';
import { DocContext } from '../interface';

abstract class DocCode extends ContextConsumer<DocContext> {
  protected _key = 'doc';
  abstract preview: HTMLElement;
  abstract code: string;

  connectedCallback() {}

  private _render() {}
}
