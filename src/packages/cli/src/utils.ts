import * as fs from 'fs';
import * as path from 'path';
import { ComponentGraph, Template, TemplateConfig } from './types';
import simpleGit from 'simple-git';
import axios from 'axios'; // Add this import for fetching remote files

export async function getRemoteComponents(componentsPath: string): Promise<ComponentGraph> {
  if (componentsPath.startsWith('http://') || componentsPath.startsWith('https://')) {
    // Fetch components.json from remote using axios
    const response = await axios.get(componentsPath);
    return response.data as ComponentGraph;
  } else {
    // Read components.json from local file system
    const filePath = path.resolve(process.cwd(), componentsPath);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as ComponentGraph;
  }
}

export async function getRemoteTemplates(templatesPath: string): Promise<TemplateConfig> {
  if (templatesPath.startsWith('http://') || templatesPath.startsWith('https://')) {
    // Fetch templates.json from remote using axios
    const response = await axios.get(templatesPath);
    return response.data as TemplateConfig;
  } else {
    // Read templates.json from local file system
    const filePath = path.resolve(process.cwd(), templatesPath);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as TemplateConfig;
  }
}

export async function installComponent(
  componentName: string,
  remoteComponents: ComponentGraph,
  localComponents: ComponentGraph
): Promise<void> {
  const component = remoteComponents.components[componentName];
  const repoUrl = `${remoteComponents.baseUrl}/${component.repoUrl}`;
  const branch = component.branch || remoteComponents.defaultBranch;

  const componentDir = path.resolve(process.cwd(), 'components', componentName);

  const git = simpleGit();
  await git.clone(repoUrl, componentDir);
  await git.cwd(componentDir).checkout(branch);

  const commitHash = await git.revparse(['HEAD']);

  localComponents.components[componentName] = {
    ...component,
    version: commitHash,
    branch: branch,
  };
}

export async function installTemplate(template: Template): Promise<void> {
  const repoUrl = template.repoUrl;
  const branch = template.branch;

  const git = simpleGit();
  await git.clone(repoUrl, process.cwd());
  await git.cwd(process.cwd()).checkout(branch);
}

// ... other utility functions (e.g., analyzeTemplate) can be added here