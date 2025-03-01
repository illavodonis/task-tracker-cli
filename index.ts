#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import Tasks from "./services/task/task.services";
import { TaskStatus } from "./services/task/task.interface";

const program = new Command();

program
  .name("task-cli")
  .description("Task tracker is a project used to track and manage your tasks.")
  .version("1.0.0");

program
  .command("add [taskDescription]")
  .description("add new task")
  .action((taskDescription) => {
    Tasks.createTask(taskDescription);
  });

program
  .command("update [taskId] [newTaskDescription]")
  .description("update task")
  .action(async (taskId, newTaskDescription) => {
    Tasks.updateTask(taskId, {description: newTaskDescription});
  });

program
  .command("mark-in-progress [taskId]")
  .description("mark task in-progress")
  .action(async (taskId) => {
    Tasks.updateTask(taskId,{status: TaskStatus.IN_PROGRESS});
  });

program
  .command("mark-done [taskId]")
  .description("mark task done")
  .action(async (taskId) => {
    Tasks.updateTask(taskId,{status: TaskStatus.DONE});
  });

program
  .command("list [status]")
  .description("get task list")
  .action(async (status) => {
    Tasks.getTasks(status);
  });

program
  .command("delete [taskId]")
  .description("delete task")
  .action((taskId) => {
    Tasks.deleteTask(taskId);
  });

program
  .command("exit")
  .description("exit CLI")
  .action(()=> {
    process.exit(0);
  })
program.parse(process.argv);
