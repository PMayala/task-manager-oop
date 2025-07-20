// src/CLI.js - Command Line Interface using Commander.js, Inquirer.js, and Chalk
const { Command } = require("commander")
const inquirer = require("inquirer")
const chalk = require("chalk")
const TaskManager = require("./TaskManager")

class CLI {
  constructor() {
    this.taskManager = new TaskManager()
    this.program = new Command()
    this.setupCommands()
  }

  setupCommands() {
    this.program.name("task-manager").description("A comprehensive task management CLI application").version("1.0.0")

    this.program
      .command("start")
      .description("Start the interactive task manager")
      .action(() => this.startInteractive())

    this.program
      .command("add")
      .description("Add a new task")
      .action(() => this.addTaskCommand())

    this.program
      .command("list")
      .description("List all tasks")
      .action(() => this.listTasksCommand())

    this.program
      .command("search <query>")
      .description("Search tasks by keyword")
      .action((query) => this.searchTasksCommand(query))

    this.program
      .command("stats")
      .description("Show task statistics")
      .action(() => this.showStatsCommand())
  }

  async start() {
    console.log(chalk.blue.bold("\n🎯 Welcome to Task Manager!"))
    console.log(chalk.blue("====================================="))

    try {
      await this.taskManager.initialize()

      // If no arguments provided, start interactive mode
      if (process.argv.length <= 2) {
        await this.startInteractive()
      } else {
        this.program.parse()
      }
    } catch (error) {
      console.error(chalk.red("Failed to initialize task manager:"), error.message)
    }
  }

  async startInteractive() {
    while (true) {
      try {
        const { action } = await inquirer.prompt([
          {
            type: "list",
            name: "action",
            message: chalk.cyan("What would you like to do?"),
            choices: [
              { name: "➕ Add Task", value: "add" },
              { name: "📋 View All Tasks", value: "view" },
              { name: "🔍 Filter Tasks", value: "filter" },
              { name: "✏️ Update Task", value: "update" },
              { name: "🗑️ Delete Task", value: "delete" },
              { name: "✅ Toggle Task Completion", value: "toggle" },
              { name: "🔍 Search Tasks", value: "search" },
              { name: "📊 Task Statistics", value: "stats" },
              { name: "📤 Export/Import", value: "export" },
              { name: "👋 Exit", value: "exit" },
            ],
          },
        ])

        if (action === "exit") {
          console.log(chalk.green("\n👋 Thank you for using Task Manager!"))
          process.exit(0)
        }

        await this.handleAction(action)
      } catch (error) {
        console.error(chalk.red("❌ Error:"), error.message)
      }
    }
  }

  async handleAction(action) {
    switch (action) {
      case "add":
        await this.addTaskFlow()
        break
      case "view":
        await this.viewAllTasks()
        break
      case "filter":
        await this.filterTasksFlow()
        break
      case "update":
        await this.updateTaskFlow()
        break
      case "delete":
        await this.deleteTaskFlow()
        break
      case "toggle":
        await this.toggleTaskFlow()
        break
      case "search":
        await this.searchTasksFlow()
        break
      case "stats":
        await this.showStatistics()
        break
      case "export":
        await this.exportImportFlow()
        break
    }
  }

  async addTaskFlow() {
    console.log(chalk.yellow("\n➕ Add New Task"))
    console.log(chalk.yellow("================"))

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Task title:",
        validate: (input) => input.trim().length > 0 || "Title is required",
      },
      {
        type: "input",
        name: "description",
        message: "Description (optional):",
      },
      {
        type: "list",
        name: "priority",
        message: "Priority:",
        choices: ["High", "Medium", "Low"],
        default: "Medium",
      },
      {
        type: "input",
        name: "dueDate",
        message: "Due date (YYYY-MM-DD, optional):",
        validate: (input) => {
          if (!input) return true
          const date = new Date(input)
          return !isNaN(date.getTime()) || "Invalid date format"
        },
      },
      {
        type: "input",
        name: "category",
        message: "Category:",
        default: "General",
      },
      {
        type: "list",
        name: "taskType",
        message: "Task type:",
        choices: ["regular", "work", "personal"],
        default: "regular",
      },
    ])

    try {
      const task = await this.taskManager.addTask(
        answers.title,
        answers.description,
        answers.priority,
        answers.dueDate || null,
        answers.category,
        answers.taskType,
      )
      console.log(chalk.green(`✅ Task "${task.title}" added successfully!`))
    } catch (error) {
      console.log(chalk.red(`❌ ${error.message}`))
    }
  }

  async viewAllTasks() {
    console.log(chalk.yellow("\n📋 All Tasks"))
    console.log(chalk.yellow("============="))

    const tasks = this.taskManager.getAllTasks()
    if (tasks.length === 0) {
      console.log(chalk.gray("No tasks found."))
      return
    }

    this.displayTasks(tasks)
  }

  async filterTasksFlow() {
    const { filterType } = await inquirer.prompt([
      {
        type: "list",
        name: "filterType",
        message: "How would you like to filter tasks?",
        choices: [
          { name: "By Category", value: "category" },
          { name: "By Priority", value: "priority" },
          { name: "By Status (Complete/Incomplete)", value: "status" },
          { name: "Overdue Tasks", value: "overdue" },
          { name: "Due Soon (Next 7 days)", value: "dueSoon" },
        ],
      },
    ])

    let filteredTasks = []

    switch (filterType) {
      case "category":
        const { category } = await inquirer.prompt([{ type: "input", name: "category", message: "Enter category:" }])
        filteredTasks = this.taskManager.filterByCategory(category)
        break
      case "priority":
        const { priority } = await inquirer.prompt([
          {
            type: "list",
            name: "priority",
            message: "Select priority:",
            choices: ["High", "Medium", "Low"],
          },
        ])
        filteredTasks = this.taskManager.filterByPriority(priority)
        break
      case "status":
        const { showCompleted } = await inquirer.prompt([
          {
            type: "confirm",
            name: "showCompleted",
            message: "Show completed tasks?",
            default: false,
          },
        ])
        filteredTasks = this.taskManager.filterByStatus(showCompleted)
        break
      case "overdue":
        filteredTasks = this.taskManager.getOverdueTasks()
        break
      case "dueSoon":
        filteredTasks = this.taskManager.getTasksDueSoon()
        break
    }

    if (filteredTasks.length === 0) {
      console.log(chalk.gray("No tasks match the filter criteria."))
    } else {
      this.displayTasks(filteredTasks)
    }
  }

  async updateTaskFlow() {
    const tasks = this.taskManager.getAllTasks()
    if (tasks.length === 0) {
      console.log(chalk.gray("No tasks available to update."))
      return
    }

    const taskChoices = tasks.map((task, index) => ({
      name: `${index + 1}. ${task.toString()}`,
      value: task,
    }))

    const { selectedTask } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedTask",
        message: "Select task to update:",
        choices: taskChoices,
      },
    ])

    const updates = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "New title (leave empty to keep current):",
        default: selectedTask.title,
      },
      {
        type: "input",
        name: "description",
        message: "New description (leave empty to keep current):",
        default: selectedTask.description,
      },
      {
        type: "list",
        name: "priority",
        message: "New priority:",
        choices: ["High", "Medium", "Low"],
        default: selectedTask.priority,
      },
      {
        type: "input",
        name: "category",
        message: "New category:",
        default: selectedTask.category,
      },
    ])

    try {
      await this.taskManager.updateTask(selectedTask.id, updates)
      console.log(chalk.green("✅ Task updated successfully!"))
    } catch (error) {
      console.log(chalk.red(`❌ ${error.message}`))
    }
  }

  async deleteTaskFlow() {
    const tasks = this.taskManager.getAllTasks()
    if (tasks.length === 0) {
      console.log(chalk.gray("No tasks available to delete."))
      return
    }

    const taskChoices = tasks.map((task, index) => ({
      name: `${index + 1}. ${task.toString()}`,
      value: task,
    }))

    const { selectedTask } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedTask",
        message: "Select task to delete:",
        choices: taskChoices,
      },
    ])

    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `Are you sure you want to delete "${selectedTask.title}"?`,
        default: false,
      },
    ])

    if (confirm) {
      try {
        await this.taskManager.deleteTask(selectedTask.id)
        console.log(chalk.green("✅ Task deleted successfully!"))
      } catch (error) {
        console.log(chalk.red(`❌ ${error.message}`))
      }
    } else {
      console.log(chalk.yellow("❌ Delete cancelled."))
    }
  }

  async toggleTaskFlow() {
    const tasks = this.taskManager.getAllTasks()
    if (tasks.length === 0) {
      console.log(chalk.gray("No tasks available."))
      return
    }

    const taskChoices = tasks.map((task, index) => ({
      name: `${index + 1}. ${task.toString()}`,
      value: task,
    }))

    const { selectedTask } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedTask",
        message: "Select task to toggle completion:",
        choices: taskChoices,
      },
    ])

    try {
      await this.taskManager.toggleTaskCompletion(selectedTask.id)
      const status = selectedTask.completed ? "completed" : "incomplete"
      console.log(chalk.green(`✅ Task marked as ${status}!`))
    } catch (error) {
      console.log(chalk.red(`❌ ${error.message}`))
    }
  }

  async searchTasksFlow() {
    const { query } = await inquirer.prompt([
      {
        type: "input",
        name: "query",
        message: "Enter search query:",
        validate: (input) => input.trim().length > 0 || "Search query is required",
      },
    ])

    const results = this.taskManager.searchTasks(query)

    if (results.length === 0) {
      console.log(chalk.gray(`No tasks found matching "${query}"`))
    } else {
      console.log(chalk.green(`\nFound ${results.length} task(s):`))
      this.displayTasks(results)
    }
  }

  async showStatistics() {
    console.log(chalk.yellow("\n📊 Task Statistics"))
    console.log(chalk.yellow("=================="))

    const stats = this.taskManager.getTaskStats()
    console.log(chalk.cyan(`Total Tasks: ${stats.total}`))
    console.log(chalk.green(`Completed: ${stats.completed}`))
    console.log(chalk.yellow(`Pending: ${stats.pending}`))
    console.log(chalk.red(`Overdue: ${stats.overdue}`))
    console.log(chalk.magenta(`Due Soon: ${stats.dueSoon}`))
    console.log(chalk.blue(`Completion Rate: ${stats.completionRate}%`))
  }

  async exportImportFlow() {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          { name: "📤 Export Tasks", value: "export" },
          { name: "📥 Import Tasks", value: "import" },
        ],
      },
    ])

    if (action === "export") {
      const { filePath } = await inquirer.prompt([
        {
          type: "input",
          name: "filePath",
          message: "Export file path:",
          default: "./exports/exported_tasks.json",
        },
      ])

      try {
        const success = await this.taskManager.exportTasks(filePath)
        if (success) {
          console.log(chalk.green(`✅ Tasks exported to ${filePath}`))
        } else {
          console.log(chalk.red("❌ Export failed"))
        }
      } catch (error) {
        console.log(chalk.red(`❌ Export error: ${error.message}`))
      }
    } else {
      const { filePath } = await inquirer.prompt([
        {
          type: "input",
          name: "filePath",
          message: "Import file path:",
          validate: (input) => input.trim().length > 0 || "File path is required",
        },
      ])

      try {
        const count = await this.taskManager.importTasks(filePath)
        console.log(chalk.green(`✅ Imported ${count} tasks`))
      } catch (error) {
        console.log(chalk.red(`❌ Import error: ${error.message}`))
      }
    }
  }

  // Command-line specific methods
  async addTaskCommand() {
    await this.taskManager.initialize()
    await this.addTaskFlow()
  }

  async listTasksCommand() {
    await this.taskManager.initialize()
    await this.viewAllTasks()
  }

  async searchTasksCommand(query) {
    await this.taskManager.initialize()
    const results = this.taskManager.searchTasks(query)

    if (results.length === 0) {
      console.log(chalk.gray(`No tasks found matching "${query}"`))
    } else {
      console.log(chalk.green(`Found ${results.length} task(s):`))
      this.displayTasks(results)
    }
  }

  async showStatsCommand() {
    await this.taskManager.initialize()
    await this.showStatistics()
  }

  displayTasks(tasks) {
    if (tasks.length === 0) {
      console.log(chalk.gray("No tasks to display."))
      return
    }

    tasks.forEach((task, index) => {
      const status = task.completed ? chalk.green("✓") : chalk.gray("○")
      const priority = this.colorPriority(task.priority)
      const overdue = task.isOverdue() ? chalk.red(" (OVERDUE)") : ""
      const dueInfo = task.dueDate ? ` | Due: ${task.dueDate.toLocaleDateString()}${overdue}` : ""

      console.log(
        `${index + 1}. [${status}] ${chalk.bold(task.title)} | ${priority} | ${chalk.cyan(task.category)}${dueInfo}`,
      )

      if (task.description) {
        console.log(chalk.gray(`   Description: ${task.description}`))
      }
    })
  }

  colorPriority(priority) {
    switch (priority) {
      case "High":
        return chalk.red(priority)
      case "Medium":
        return chalk.yellow(priority)
      case "Low":
        return chalk.green(priority)
      default:
        return priority
    }
  }
}

module.exports = CLI
