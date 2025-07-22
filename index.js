#!/usr/bin/env node

// Main application entry point
const { Task, WorkTask, PersonalTask } = require("./src/Task")
const TaskManager = require("./src/TaskManager")
const FileHandler = require("./src/FileHandler")
const Validator = require("./src/Validator")
const CLI = require("./src/CLI")

// Main application entry point
async function main() {
  try {
    const cli = new CLI()
    await cli.start()
  } catch (error) {
    console.error("Application error:", error.message)
    process.exit(1)
  }
}

// Export classes for testing and modular usage
module.exports = {
  Task,
  WorkTask,
  PersonalTask,
  TaskManager,
  FileHandler,
  Validator,
  CLI,
}

// Run the application if this file is executed directly
if (require.main === module) {
  main()
}
