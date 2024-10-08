import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { removeCommand } from './commands/remove';
import { listCommand } from './commands/list';

export function setupCLI(): Command {
  const program = new Command();

  program
    .version('0.0.0', '-v, --version', 'Output the current version')
    .description('CLI for prototype-ui project');

  program.addCommand(initCommand);
  program.addCommand(addCommand);
  program.addCommand(removeCommand);
  program.addCommand(listCommand);

  return program;
}