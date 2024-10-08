export interface Component {
    name: string;
    repoUrl: string;
    branch: string;
    version: string;
    dependencies: string[];
  }
  
  export interface ComponentGraph {
    components: { [name: string]: Component };
    baseUrl: string;
    defaultBranch: string;
  }
  
  export interface Template {
    name: string;
    repoUrl: string;
    branch: string;
    version: string;
    description: string;
  }
  
  export interface TemplateConfig {
    templates: { [name: string]: Template };
  }