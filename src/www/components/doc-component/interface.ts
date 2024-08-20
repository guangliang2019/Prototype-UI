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
  contents: DocSectionContent[];
}

export interface DocSectionContent {
  type: 'code' | 'text';
  content: string;
}

export interface DocContext {
  doc: Doc;
}
