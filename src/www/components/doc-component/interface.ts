export interface Doc {
  title: string;
  desc: string;
  id: string;
  route: string[];
  links: DocLink[];
  sections: DocSection[];
}

export interface DocLink {
  title: string;
  url: string;
}

export interface DocSection {
  title: string;
  contents: DocSectionContent[];
}

export interface DocSectionContent {
  /**
   * type 为 code 时，content 的值为自定义 preview & code 组件的标签名
   * type 为 text 时，content 的值为 markdown 文本
   */
  type: 'code' | 'text';
  /**
   * key 与渲染无关，仅作为唯一标识
   */
  key: string;
  /**
   * 有些时候章节元素会带有二级标题，而有些时候没有，这会体现在侧边导航（doc-anchor）中
   */
  title?: string;
  /**
   * type 为 code 时，content 的值为自定义 preview & code 组件的标签名
   * type 为 text 时，content 的值为 markdown 文本
   */
  content: string;
}

export interface DocContext {
  doc: Doc;
}
