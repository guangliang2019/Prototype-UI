export interface Doc {
  title: string;
  desc: string;
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
  contents: DocsSectionContent[];
}

export interface DocsSectionContent {
  type: 'code' | 'text';
  content: string;
}

export interface DocsContext {
  doc: Doc;
}
