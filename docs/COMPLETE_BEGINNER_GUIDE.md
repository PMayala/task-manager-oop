# Complete Beginner's Guide to the Task Manager Application

## Table of Contents
1. [What is This Application?](#what-is-this-application)
2. [Basic Programming Concepts](#basic-programming-concepts)
3. [File Structure Explained](#file-structure-explained)
4. [Understanding Each File](#understanding-each-file)
5. [How Everything Works Together](#how-everything-works-together)
6. [Running the Application](#running-the-application)

---

## What is This Application?

Imagine you have a notebook where you write down tasks you need to do. This application is like a digital version of that notebook, but much smarter! It can:
- Store your tasks permanently on your computer
- Help you search for specific tasks
- Sort tasks by priority or due date
- Keep track of completed vs incomplete tasks
- Create backups so you never lose your data

The application runs in your computer's terminal (command line) and uses text-based menus to interact with you.

---

## Basic Programming Concepts

Before we dive into the code, let's understand some fundamental concepts:

### What is a Variable?
A variable is like a labeled box that stores information.
```javascript
let taskTitle = "Buy groceries"  // A box labeled 'taskTitle' containing the text "Buy groceries"
let taskCount = 5                // A box labeled 'taskCount' containing the number 5
```

### What is a Function?
A function is like a recipe - it takes ingredients (inputs) and produces a result (output).
```javascript
function addNumbers(a, b) {      // Recipe name: addNumbers, ingredients: a and b
    return a + b                 // Instructions: add a and b together
}
let result = addNumbers(3, 5)    // Using the recipe with ingredients 3 and 5, result is 8
```

### What is a Class?
A class is like a blueprint for creating objects. Think of it like a cookie cutter - you can use it to make many similar cookies (objects).
```javascript
class Car {                      // Blueprint for making cars
    constructor(color, brand) {  // Instructions for what every car needs
        this.color = color
        this.brand = brand
    }
    
    start() {                    // Something every car can do
        console.log("Engine started!")
    }
}

let myCar = new Car("red", "Toyota")  // Using the blueprint to make a specific car
myCar.start()                         // Making my car do something
```

### What is Object-Oriented Programming (OOP)?
OOP is a way of organizing code by grouping related data and functions together into objects. It's like organizing your house - you keep kitchen items in the kitchen, bedroom items in the bedroom, etc.

The four main principles are:
1. **Encapsulation**: Keeping related things together and hiding internal details
2. **Inheritance**: Creating new classes based on existing ones (like how a sports car is still a car)
3. **Polymorphism**: Different objects can do the same action in their own way
4. **Abstraction**: Hiding complex details and showing only what's necessary

---

## File Structure Explained

Our application is organized like a well-organized office building:

```
task-manager-oop/
├── index.js              # The main entrance - where everything starts
├── src/                  # The office floors - where the work happens
│   ├── Task.js          # The blueprint for individual tasks
│   ├── TaskManager.js   # The manager who handles all tasks
│   ├── FileHandler.js   # The filing clerk who saves/loads data
│   ├── Validator.js     # The quality checker who validates data
│   └── CLI.js           # The receptionist who talks to users
├── tests/               # The quality assurance department
├── docs/                # The documentation library
├── exports/             # The shipping department for exported files
├── package.json         # The building directory (project info)
├── tasks.json           # The main filing cabinet (data storage)
└── tasks_backup.json    # The backup filing cabinet
```

### Why This Structure?
- **Separation of Concerns**: Each file has one main job
- **Maintainability**: Easy to find and fix problems
- **Reusability**: Parts can be used in other projects
- **Testing**: Each part can be tested independently

---

## Understanding Each File

### 1. package.json - The Project's ID Card

```json
{
  "name": "task-manager-oop",           // What is this project called?
  "version": "1.0.0",                   // What version is it?
  "description": "A command-line task management application...",  // What does it do?
  "main": "index.js",                   // Where does the program start?
  "scripts": {                          // Shortcuts for common commands
    "start": "node index.js",           // 'npm start' runs 'node index.js'
    "test": "jest"                      // 'npm test' runs 'jest'
  },
  "dependencies": {                     // External libraries this project needs
    "commander": "^9.4.1",              // For command-line interface
    "inquirer": "^8.2.5",               // For interactive prompts
    "chalk": "^4.1.2"                   // For colored text in terminal
  }
}
```

**Think of it like**: A business card that tells you everything about the project.

### 2. index.js - The Main Entrance

```javascript
#!/usr/bin/env node
// This line tells the computer: "Use Node.js to run this file"

// IMPORTING MODULES (like calling people to come help)
const { Task, WorkTask, PersonalTask } = require("./src/Task")
// "Hey Task.js, I need your Task, WorkTask, and PersonalTask blueprints"

const TaskManager = require("./src/TaskManager")
// "Hey TaskManager.js, I need your TaskManager class"

const FileHandler = require("./src/FileHandler")
// "Hey FileHandler.js, I need your FileHandler class"

const Validator = require("./src/Validator")
// "Hey Validator.js, I need your Validator class"

const CLI = require("./src/CLI")
// "Hey CLI.js, I need your CLI class"

// THE MAIN FUNCTION (the boss who starts everything)
async function main() {
  try {
    // Create a new CLI (receptionist) to handle user interaction
    const cli = new CLI()
    
    // Start the CLI (open the office for business)
    await cli.start()
  } catch (error) {
    // If something goes wrong, tell the user and close the program
    console.error("Application error:", error.message)
    process.exit(1)  // Exit with error code 1 (means something went wrong)
  }
}

// EXPORTING FOR TESTS (sharing our tools with the testing department)
module.exports = {
  Task,
  WorkTask,
  PersonalTask,
  TaskManager,
  FileHandler,
  Validator,
  CLI,
}

// CHECK IF THIS FILE IS BEING RUN DIRECTLY
if (require.main === module) {
  // If someone runs 'node index.js', start the main function
  main()
}
```

**Key Concepts Explained:**

- **`require()`**: Like asking someone to bring you their tools
- **`async/await`**: Like saying "wait for this to finish before continuing"
- **`try/catch`**: Like having a safety net - if something breaks, catch it and handle it gracefully
- **`module.exports`**: Like sharing your tools with others
- **`require.main === module`**: Checking if this file is the one being run directly

### 3. src/Task.js - The Task Blueprint

This file defines what a task is and what it can do.

```javascript
// TASK CLASS DEFINITION
class Task {
  // PRIVATE FIELDS (things only this task knows about itself)
  #id           // Secret ID number (# makes it private)
  #title        // Secret title
  #description  // Secret description
  #priority     // Secret priority level
  #dueDate      // Secret due date
  #category     // Secret category
  #completed    // Secret completion status
  #createdAt    // Secret creation timestamp

  // CONSTRUCTOR (the birth certificate - what every task needs when created)
  constructor(title, description, priority = "Medium", dueDate = null, category = "General") {
    // Generate a unique ID (like a social security number for tasks)
    this.#id = this.generateId()
    
    // Validate and store the title (make sure it's not empty)
    this.#title = this.validateTitle(title)
    
    // Store other information
    this.#description = description || ""  // If no description, use empty string
    this.#priority = this.validatePriority(priority)
    this.#dueDate = dueDate ? new Date(dueDate) : null  // Convert string to Date object
    this.#category = category
    this.#completed = false  // New tasks start as incomplete
    this.#createdAt = new Date()  // Remember when this task was created
  }

  // PRIVATE METHODS (internal helper functions)
  generateId() {
    // Create a unique ID using current time + random characters
    return "task_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    // Example result: "task_1640995200000_abc123def"
  }

  validateTitle(title) {
    // Make sure the title isn't empty
    if (!title || title.trim().length === 0) {
      throw new Error("Task title cannot be empty")  // Stop everything and complain
    }
    return title.trim()  // Remove extra spaces from beginning and end
  }

  validatePriority(priority) {
    // Make sure priority is one of the allowed values
    const validPriorities = ["High", "Medium", "Low"]
    if (!validPriorities.includes(priority)) {
      throw new Error("Priority must be High, Medium, or Low")
    }
    return priority
  }

  // GETTERS (safe ways to peek at private information)
  get id() { return this.#id }           // "What's your ID?"
  get title() { return this.#title }     // "What's your title?"
  get description() { return this.#description }
  get priority() { return this.#priority }
  get dueDate() { return this.#dueDate }
  get category() { return this.#category }
  get completed() { return this.#completed }
  get createdAt() { return this.#createdAt }

  // SETTERS (safe ways to change private information)
  set title(newTitle) {
    this.#title = this.validateTitle(newTitle)  // Validate before storing
  }

  set description(newDescription) {
    this.#description = newDescription || ""
  }

  set priority(newPriority) {
    this.#priority = this.validatePriority(newPriority)
  }

  set dueDate(newDueDate) {
    this.#dueDate = newDueDate ? new Date(newDueDate) : null
  }

  set category(newCategory) {
    this.#category = newCategory || "General"
  }

  // PUBLIC METHODS (things tasks can do)
  markComplete() {
    this.#completed = true  // "I'm done!"
  }

  markIncomplete() {
    this.#completed = false  // "Actually, I'm not done yet"
  }

  isOverdue() {
    // Check if this task is past its due date
    if (!this.#dueDate || this.#completed) return false  // No due date or already done = not overdue
    return new Date() > this.#dueDate  // Is today after the due date?
  }

  getDaysUntilDue() {
    // Calculate how many days until this task is due
    if (!this.#dueDate) return null  // No due date = no countdown
    
    const today = new Date()
    const diffTime = this.#dueDate - today  // Difference in milliseconds
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))  // Convert to days
    // 1000 ms = 1 second, 60 seconds = 1 minute, 60 minutes = 1 hour, 24 hours = 1 day
  }

  // SERIALIZATION (converting to/from storage format)
  toJSON() {
    // Convert this task to a format that can be saved to a file
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      priority: this.#priority,
      dueDate: this.#dueDate ? this.#dueDate.toISOString() : null,  // Convert Date to string
      category: this.#category,
      completed: this.#completed,
      createdAt: this.#createdAt.toISOString()
    }
  }

  static fromJSON(data) {
    // Create a task from saved data (static = belongs to the class, not an instance)
    const task = new Task(data.title, data.description, data.priority, data.dueDate, data.category)
    task.#id = data.id
    task.#completed = data.completed
    task.#createdAt = new Date(data.createdAt)
    return task
  }

  toString() {
    // Create a human-readable representation of this task
    const status = this.#completed ? "✓" : "○"  // Checkmark or circle
    const overdue = this.isOverdue() ? " (OVERDUE)" : ""
    const dueInfo = this.#dueDate ? ` | Due: ${this.#dueDate.toLocaleDateString()}${overdue}` : ""
    return `[${status}] ${this.#title} | ${this.#priority} | ${this.#category}${dueInfo}`
  }
}

// SPECIALIZED TASK CLASSES (inheritance in action)
class WorkTask extends Task {
  // A WorkTask is a Task, but with extra work-specific features
  constructor(title, description, priority, dueDate, project = "General") {
    super(title, description, priority, dueDate, "Work")  // Call parent constructor
    this.project = project  // Add project information
  }

  toString() {
    // Override the parent's toString method
    const baseString = super.toString()  // Get the parent's version
    return `${baseString} | Project: ${this.project}`  // Add project info
  }
}

class PersonalTask extends Task {
  // A PersonalTask is a Task, but with personal-specific features
  constructor(title, description, priority, dueDate, location = null) {
    super(title, description, priority, dueDate, "Personal")
    this.location = location
  }

  toString() {
    const baseString = super.toString()
    const locationInfo = this.location ? ` | Location: ${this.location}` : ""
    return `${baseString}${locationInfo}`
  }
}

// EXPORT THE CLASSES (share them with other files)
module.exports = { Task, WorkTask, PersonalTask }
```

**Key OOP Concepts Demonstrated:**

1. **Encapsulation**: Private fields (#) hide internal data
2. **Inheritance**: WorkTask and PersonalTask extend Task
3. **Polymorphism**: Each class has its own toString() method
4. **Abstraction**: Complex ID generation is hidden in a private method

### 4. src/TaskManager.js - The Task Manager

This is like the office manager who coordinates all task-related activities.

```javascript
// IMPORTS (calling in the helpers)
const FileHandler = require("./FileHandler")
const Validator = require("./Validator")
const { Task, WorkTask, PersonalTask } = require("./Task")

class TaskManager {
  constructor() {
    this.tasks = []  // Array to hold all tasks (like a filing cabinet)
    this.fileHandler = new FileHandler()  // Helper for saving/loading files
  }

  async initialize() {
    // Load existing tasks from file when the manager starts work
    this.tasks = await this.fileHandler.loadTasks()
    console.log(`Loaded ${this.tasks.length} tasks`)
  }

  // CRUD OPERATIONS (Create, Read, Update, Delete)
  
  async addTask(title, description, priority = "Medium", dueDate = null, category = "General", taskType = "regular") {
    try {
      // STEP 1: Validate the input data
      const validation = Validator.validateTaskData({ title, priority, dueDate })
      if (!validation.isValid) {
        throw new Error(validation.errors.join(", "))
      }

      // STEP 2: Create the appropriate type of task
      let task
      switch (taskType.toLowerCase()) {
        case "work":
          task = new WorkTask(title, description, priority, dueDate)
          break
        case "personal":
          task = new PersonalTask(title, description, priority, dueDate)
          break
        default:
          task = new Task(title, description, priority, dueDate, category)
      }

      // STEP 3: Add to our collection and save
      this.tasks.push(task)  // Add to the array
      await this.saveTasks()  // Save to file
      return task
    } catch (error) {
      throw new Error(`Failed to add task: ${error.message}`)
    }
  }

  async updateTask(id, updates) {
    // STEP 1: Find the task
    const task = this.findTaskById(id)
    if (!task) {
      throw new Error("Task not found")
    }

    // STEP 2: Validate the updates
    const validation = Validator.validateTaskData(updates)
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "))
    }

    // STEP 3: Apply the updates
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined && key in task) {
        task[key] = updates[key]  // Update each property
      }
    })

    // STEP 4: Save changes
    await this.saveTasks()
    return task
  }

  async deleteTask(id) {
    // Find the task's position in the array
    const taskIndex = this.tasks.findIndex((task) => task.id === id)
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }

    // Remove it from the array (splice removes items from an array)
    const deletedTask = this.tasks.splice(taskIndex, 1)[0]  // [0] gets the first (and only) removed item
    await this.saveTasks()
    return deletedTask
  }

  async toggleTaskCompletion(id) {
    const task = this.findTaskById(id)
    if (!task) {
      throw new Error("Task not found")
    }

    // Toggle between complete and incomplete
    if (task.completed) {
      task.markIncomplete()
    } else {
      task.markComplete()
    }

    await this.saveTasks()
    return task
  }

  // SEARCH AND FILTER OPERATIONS
  
  searchTasks(query) {
    // Search through all tasks for the query string
    const lowerQuery = query.toLowerCase()
    return this.tasks.filter((task) =>
      task.title.toLowerCase().includes(lowerQuery) ||
      task.description.toLowerCase().includes(lowerQuery) ||
      task.category.toLowerCase().includes(lowerQuery)
    )
    // filter() creates a new array with only items that match the condition
    // includes() checks if a string contains another string
  }

  filterByCategory(category) {
    return this.tasks.filter((task) => 
      task.category.toLowerCase() === category.toLowerCase()
    )
  }

  filterByPriority(priority) {
    return this.tasks.filter((task) => 
      task.priority.toLowerCase() === priority.toLowerCase()
    )
  }

  filterByStatus(completed) {
    return this.tasks.filter((task) => task.completed === completed)
  }

  getOverdueTasks() {
    return this.tasks.filter((task) => task.isOverdue())
  }

  getTasksDueSoon(days = 7) {
    return this.tasks.filter((task) => {
      const daysUntilDue = task.getDaysUntilDue()
      return daysUntilDue !== null && daysUntilDue >= 0 && daysUntilDue <= days && !task.completed
    })
  }

  // SORTING OPERATIONS
  
  sortTasks(sortBy = "createdAt", ascending = true) {
    // Create a copy of the tasks array and sort it
    const sortedTasks = [...this.tasks].sort((a, b) => {
      let aValue, bValue

      // Determine what to sort by
      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case "priority":
          // Convert priority to numbers for sorting
          const priorityOrder = { High: 3, Medium: 2, Low: 1 }
          aValue = priorityOrder[a.priority]
          bValue = priorityOrder[b.priority]
          break
        case "dueDate":
          // Use far future date for tasks without due dates
          aValue = a.dueDate || new Date(9999, 11, 31)
          bValue = b.dueDate || new Date(9999, 11, 31)
          break
        case "category":
          aValue = a.category.toLowerCase()
          bValue = b.category.toLowerCase()
          break
        case "createdAt":
        default:
          aValue = a.createdAt
          bValue = b.createdAt
      }

      // Compare the values
      if (aValue < bValue) return ascending ? -1 : 1
      if (aValue > bValue) return ascending ? 1 : -1
      return 0
    })

    return sortedTasks
  }

  // UTILITY METHODS
  
  findTaskById(id) {
    // Search through all tasks to find one with matching ID
    return this.tasks.find((task) => task.id === id)
    // find() returns the first item that matches, or undefined if none match
  }

  getAllTasks() {
    // Return a copy of all tasks (spread operator [...] creates a copy)
    return [...this.tasks]
  }

  getTaskStats() {
    // Calculate statistics about our tasks
    const total = this.tasks.length
    const completed = this.tasks.filter(t => t.completed).length
    const pending = total - completed
    const overdue = this.getOverdueTasks().length
    const dueSoon = this.getTasksDueSoon().length

    return {
      total,
      completed,
      pending,
      overdue,
      dueSoon,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    }
  }

  // FILE OPERATIONS
  
  async saveTasks() {
    return await this.fileHandler.saveTasks(this.tasks)
  }

  async exportTasks(filePath) {
    return await this.fileHandler.exportTasks(this.tasks, filePath)
  }

  async importTasks(filePath) {
    const importedTasks = await this.fileHandler.importTasks(filePath)
    if (importedTasks) {
      this.tasks = [...this.tasks, ...importedTasks]  // Combine existing and imported tasks
      await this.saveTasks()
      return importedTasks.length
    }
    return 0
  }
}

module.exports = TaskManager
```

**Key Concepts:**

- **Arrays**: Lists of items (like `this.tasks = []`)
- **Array Methods**: `filter()`, `find()`, `push()`, `splice()`
- **Async/Await**: Waiting for file operations to complete
- **Error Handling**: Using try/catch to handle problems gracefully

### 5. src/FileHandler.js - The Filing Clerk

This class handles all file operations - saving, loading, backing up data.

```javascript
const fs = require("fs").promises  // File system operations (promises version for async/await)
const path = require("path")       // Path manipulation utilities
const { Task } = require("./Task") // Need Task class to recreate tasks from saved data

class FileHandler {
  constructor(filePath = "./tasks.json", backupPath = "./tasks_backup.json") {
    this.filePath = filePath      // Where to save the main file
    this.backupPath = backupPath  // Where to save the backup file
  }

  async ensureDirectories() {
    // Make sure required directories exist
    const dirs = ["./exports", "./docs"]
    for (const dir of dirs) {
      try {
        await fs.access(dir)  // Check if directory exists
      } catch (error) {
        await fs.mkdir(dir, { recursive: true })  // Create it if it doesn't exist
      }
    }
  }

  async ensureFileExists() {
    // Make sure the main data file exists
    try {
      await fs.access(this.filePath)  // Try to access the file
    } catch (error) {
      // File doesn't exist, create it with empty array
      await this.saveTasks([])
    }
  }

  async loadTasks() {
    try {
      // STEP 1: Make sure directories and files exist
      await this.ensureDirectories()
      await this.ensureFileExists()
      
      // STEP 2: Read the file
      const data = await fs.readFile(this.filePath, "utf8")  // Read as text
      const tasksData = JSON.parse(data)  // Convert JSON string to JavaScript object

      // STEP 3: Validate the data structure
      if (!Array.isArray(tasksData)) {
        throw new Error("Invalid tasks file format")
      }

      // STEP 4: Convert plain objects back to Task instances
      return tasksData.map((taskData) => Task.fromJSON(taskData))
    } catch (error) {
      console.error("Error loading tasks:", error.message)

      // RECOVERY: Try to load from backup
      try {
        const backupData = await fs.readFile(this.backupPath, "utf8")
        const backupTasksData = JSON.parse(backupData)
        console.log("Loaded from backup file")
        return backupTasksData.map((taskData) => Task.fromJSON(taskData))
      } catch (backupError) {
        console.log("No backup available, starting with empty task list")
        return []  // Start fresh if no backup exists
      }
    }
  }

  async saveTasks(tasks) {
    try {
      // STEP 1: Create backup before saving (safety first!)
      await this.createBackup()

      // STEP 2: Convert Task objects to plain objects
      const tasksData = tasks.map((task) => task.toJSON())
      
      // STEP 3: Write to file
      await fs.writeFile(this.filePath, JSON.stringify(tasksData, null, 2))
      // JSON.stringify converts JavaScript object to JSON string
      // null, 2 makes it pretty-printed (indented for readability)
      
      return true
    } catch (error) {
      console.error("Error saving tasks:", error.message)
      return false
    }
  }

  async createBackup() {
    try {
      // Check if main file exists
      await fs.access(this.filePath)
      // Copy main file to backup location
      await fs.copyFile(this.filePath, this.backupPath)
    } catch (error) {
      // File doesn't exist yet, no backup needed
    }
  }

  async exportTasks(tasks, exportPath) {
    try {
      // STEP 1: Make sure export directory exists
      const exportDir = path.dirname(exportPath)  // Get directory part of path
      await fs.mkdir(exportDir, { recursive: true })

      // STEP 2: Convert and save
      const tasksData = tasks.map((task) => task.toJSON())
      await fs.writeFile(exportPath, JSON.stringify(tasksData, null, 2))
      return true
    } catch (error) {
      console.error("Error exporting tasks:", error.message)
      return false
    }
  }

  async importTasks(importPath) {
    try {
      // STEP 1: Read the import file
      const data = await fs.readFile(importPath, "utf8")
      const tasksData = JSON.parse(data)

      // STEP 2: Validate format
      if (!Array.isArray(tasksData)) {
        throw new Error("Invalid import file format")
      }

      // STEP 3: Convert to Task objects
      return tasksData.map((taskData) => Task.fromJSON(taskData))
    } catch (error) {
      console.error("Error importing tasks:", error.message)
      return null
    }
  }
}

module.exports = FileHandler
```

**Key File System Concepts:**

- **`fs.readFile()`**: Read content from a file
- **`fs.writeFile()`**: Write content to a file
- **`fs.access()`**: Check if a file/directory exists
- **`fs.mkdir()`**: Create a directory
- **`JSON.stringify()`**: Convert JavaScript object to JSON string
- **`JSON.parse()`**: Convert JSON string to JavaScript object

### 6. src/Validator.js - The Quality Checker

This class ensures all data meets our standards before being processed.

```javascript
class Validator {
  // All methods are static (belong to the class, not instances)
  // Think of it like a utility toolbox - you don't need to create a validator object
  
  static validateTaskData(data) {
    const errors = []  // Collect all errors found

    // Check title
    if (!data.title || data.title.trim().length === 0) {
      errors.push("Title is required")
    }

    // Check priority
    if (data.priority && !["High", "Medium", "Low"].includes(data.priority)) {
      errors.push("Priority must be High, Medium, or Low")
    }

    // Check due date
    if (data.dueDate) {
      const date = new Date(data.dueDate)
      if (isNaN(date.getTime())) {  // isNaN checks if it's "Not a Number"
        errors.push("Invalid due date format")
      }
    }

    // Return validation result
    return {
      isValid: errors.length === 0,  // True if no errors found
      errors
    }
  }

  static validateId(id) {
    // Check if ID is a non-empty string
    return typeof id === "string" && id.length > 0
  }

  static sanitizeInput(input) {
    // Clean up user input to prevent security issues
    if (typeof input !== "string") return input
    return input.trim().replace(/[<>]/g, "")  // Remove < and > characters
    // trim() removes spaces from beginning and end
    // replace() with regex /[<>]/g removes all < and > characters
  }
}

module.exports = Validator
```

**Key Validation Concepts:**

- **Static Methods**: Methods that belong to the class, not instances
- **Input Sanitization**: Cleaning user input for security
- **Data Validation**: Checking if data meets requirements
- **Regular Expressions**: Patterns for finding/replacing text

### 7. src/CLI.js - The User Interface

This is the most complex file - it handles all user interaction using modern CLI libraries.

```javascript
// IMPORTS
const { Command } = require("commander")    // For parsing command-line arguments
const inquirer = require("inquirer")        // For interactive prompts
const chalk = require("chalk")              // For colored terminal output
const TaskManager = require("./TaskManager")

class CLI {
  constructor() {
    this.taskManager = new TaskManager()    // Our task manager
    this.program = new Command()            // Commander.js program
    this.setupCommands()                    // Set up command-line commands
  }

  setupCommands() {
    // Configure the command-line interface
    this.program
      .name("task-manager")
      .description("A comprehensive task management CLI application")
      .version("1.0.0")

    // Define available commands
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
    // Welcome message with colors
    console.log(chalk.blue.bold("\n🎯 Welcome to Task Manager!"))
    console.log(chalk.blue("====================================="))

    try {
      // Initialize the task manager
      await this.taskManager.initialize()

      // Check how the program was called
      if (process.argv.length <= 2) {
        // No arguments provided, start interactive mode
        await this.startInteractive()
      } else {
        // Arguments provided, parse them as commands
        this.program.parse()
      }
    } catch (error) {
      console.error(chalk.red("Failed to initialize task manager:"), error.message)
    }
  }

  async startInteractive() {
    // Main interactive loop
    while (true) {
      try {
        // Show menu and get user choice
        const { action } = await inquirer.prompt([
          {
            type: "list",                    // Multiple choice menu
            name: "action",                  // Variable name for the answer
            message: chalk.cyan("What would you like to do?"),
            choices: [                       // Available options
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

        // Handle the user's choice
        if (action === "exit") {
          console.log(chalk.green("\n👋 Thank you for using Task Manager!"))
          process.exit(0)  // Exit successfully
        }

        await this.handleAction(action)
      } catch (error) {
        console.error(chalk.red("❌ Error:"), error.message)
      }
    }
  }

  async handleAction(action) {
    // Route to the appropriate handler based on user choice
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
    // Interactive task creation
    console.log(chalk.yellow("\n➕ Add New Task"))
    console.log(chalk.yellow("================"))

    // Ask user for task details
    const answers = await inquirer.prompt([
      {
        type: "input",                       // Text input
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
        type: "list",                        // Multiple choice
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
          if (!input) return true            // Optional field
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
      // Create the task with collected information
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

  // ... (other methods follow similar patterns)

  displayTasks(tasks) {
    // Display tasks with colors and formatting
    if (tasks.length === 0) {
      console.log(chalk.gray("No tasks to display."))
      return
    }

    tasks.forEach((task, index) => {
      // Color-code different elements
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
    // Apply different colors based on priority
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
\`\`\`

**Key CLI Concepts:**

- **Commander.js**: Parses command-line arguments and creates commands
- **Inquirer.js**: Creates interactive prompts and menus
- **Chalk**: Adds colors and styling to terminal output
- **Process.argv**: Array of command-line arguments
- **Interactive Loops**: Continuously asking for user input until they exit

---

## How Everything Works Together

### The Application Flow

1. **Startup** (`index.js`):
   \`\`\`
   User runs: npm start
   ↓
   index.js creates CLI instance
   ↓
   CLI.start() is called
   \`\`\`

2. **Initialization** (`CLI.js` → `TaskManager.js` → `FileHandler.js`):
   \`\`\`
   CLI initializes TaskManager
   ↓
   TaskManager initializes FileHandler
   ↓
   FileHandler loads existing tasks from file
   ↓
   Tasks are converted from JSON to Task objects
   \`\`\`

3. **User Interaction** (`CLI.js`):
   \`\`\`
   CLI shows interactive menu
   ↓
   User selects an action
   ↓
   CLI calls appropriate method
   \`\`\`

4. **Task Operations** (`TaskManager.js`):
   \`\`\`
   CLI calls TaskManager method
   ↓
   TaskManager validates data (using Validator)
   ↓
   TaskManager creates/modifies Task objects
   ↓
   TaskManager saves changes (using FileHandler)
   \`\`\`

5. **Data Persistence** (`FileHandler.js`):
   \`\`\`
   TaskManager calls FileHandler.saveTasks()
   ↓
   FileHandler creates backup
   ↓
   FileHandler converts Task objects to JSON
   ↓
   FileHandler writes JSON to file
   \`\`\`

### Data Flow Diagram

\`\`\`
User Input → CLI → TaskManager → Validator
                      ↓
                   Task Objects
                      ↓
                  FileHandler → JSON Files
\`\`\`

### Object Relationships

\`\`\`
CLI
├── TaskManager
│   ├── FileHandler
│   ├── Validator
│   └── Task[] (array of tasks)
│       ├── Task
│       ├── WorkTask (extends Task)
│       └── PersonalTask (extends Task)
\`\`\`

---

## Running the Application

### Installation
\`\`\`bash
# Install dependencies
npm install

# This downloads and installs:
# - commander: For command-line interface
# - inquirer: For interactive prompts  
# - chalk: For colored output
# - jest: For testing (development only)
\`\`\`

### Running
\`\`\`bash
# Interactive mode
npm start

# Direct commands
node index.js add          # Add a task
node index.js list         # List all tasks
node index.js search work  # Search for "work"
node index.js stats        # Show statistics
\`\`\`

### Testing
\`\`\`bash
# Run all tests
npm test

# This runs Jest, which:
# - Finds all files ending in .test.js
# - Runs the test functions
# - Reports results
\`\`\`

---

## Key Programming Concepts Learned

### 1. Object-Oriented Programming
- **Classes**: Blueprints for creating objects
- **Encapsulation**: Hiding internal details with private fields (#)
- **Inheritance**: Creating specialized classes (WorkTask extends Task)
- **Polymorphism**: Different classes implementing methods differently

### 2. Asynchronous Programming
- **Promises**: Objects representing future completion of operations
- **Async/Await**: Cleaner way to work with promises
- **File Operations**: Reading/writing files takes time, so we wait for completion

### 3. Error Handling
- **Try/Catch**: Gracefully handling errors
- **Validation**: Checking data before processing
- **Fallback Strategies**: Using backups when main operations fail

### 4. Data Structures
- **Arrays**: Lists of items with methods like filter(), map(), find()
- **Objects**: Key-value pairs for storing related data
- **JSON**: Text format for storing and transmitting data

### 5. Modular Programming
- **Modules**: Separate files for different responsibilities
- **Exports/Imports**: Sharing code between files
- **Separation of Concerns**: Each module has one main job

### 6. User Interface Design
- **Command-Line Interface**: Text-based interaction
- **Interactive Menus**: Using libraries for better user experience
- **Input Validation**: Ensuring user input is correct
- **Colored Output**: Making terminal output more readable

---

## What Makes This a Good Application?

### 1. **Maintainable Code**
- Clear file structure
- Each class has one responsibility
- Well-commented code
- Consistent naming conventions

### 2. **Robust Error Handling**
- Validates all user input
- Gracefully handles file errors
- Provides helpful error messages
- Has backup and recovery systems

### 3. **User-Friendly Interface**
- Interactive menus
- Colored output for better readability
- Clear instructions and feedback
- Both interactive and command-line modes

### 4. **Extensible Design**
- Easy to add new task types
- Easy to add new features
- Modular structure allows independent changes
- Well-tested components

### 5. **Data Safety**
- Automatic backups before saving
- Data validation prevents corruption
- Recovery from backup files
- Export/import for additional safety

---

This application demonstrates professional software development practices while solving a real-world problem. Every line of code serves a purpose, and the overall architecture makes it easy to understand, maintain, and extend.
