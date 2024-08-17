import '../components';
import './components';

export default class AppRoot extends HTMLElement {
  connectedCallback() {
    this.innerHTML =
      /* html */
      `
      <div id="app">
        <headless-tab default-value="docs">
          <website-nav></website-nav>
          <main class="flex-1">
            <headless-tab-content value="docs">
              <headless-tab default-value="Introduction" class="flex px-8 w-full flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                <website-aside></website-aside>
                <headless-tab-content style="display: none" value="Introduction">
                  <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"> 
                    Introduction 
                  </main>
                </headless-tab-content>
                <components-docs></components-docs>
              </headless-tab>
            </headless-tab-content>
            <headless-tab-content style="display: none" value="components"> components </headless-tab-content>
          </main>
        </headless-tab>
      </div>
      `;
  }
}

customElements.define('app-root', AppRoot);
