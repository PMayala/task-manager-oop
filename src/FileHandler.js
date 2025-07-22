// File Management Class
const fs = require("fs").promises
const path = require("path")
const { Task } = require("./Task")

class FileHandler {
  constructor(filePath = "./tasks.json", backupPath = "./tasks_backup.json") {
    this.filePath = filePath
    this.backupPath = backupPath
  }

  async ensureDirectories() {
    const dirs = ["./exports", "./docs"]
    for (const dir of dirs) {
      try {
        await fs.access(dir)
      } catch (error) {
        await fs.mkdir(dir, { recursive: true })
      }
    }
  }

  async ensureFileExists() {
    try {
      await fs.access(this.filePath)
    } catch (error) {
      await this.saveTasks([])
    }
  }

  async loadTasks() {
    try {
      await this.ensureDirectories()
      await this.ensureFileExists()
      const data = await fs.readFile(this.filePath, "utf8")
      const tasksData = JSON.parse(data)

      // Validate JSON structure
      if (!Array.isArray(tasksData)) {
        throw new Error("Invalid tasks file format")
      }

      return tasksData.map((taskData) => Task.fromJSON(taskData))
    } catch (error) {
      console.error("Error loading tasks:", error.message)

      // Try to load from backup
      try {
        const backupData = await fs.readFile(this.backupPath, "utf8")
        const backupTasksData = JSON.parse(backupData)
        console.log("Loaded from backup file")
        return backupTasksData.map((taskData) => Task.fromJSON(taskData))
      } catch (backupError) {
        console.log("No backup available, starting with empty task list")
        return []
      }
    }
  }

  async saveTasks(tasks) {
    try {
      // Create backup before saving
      await this.createBackup()

      const tasksData = tasks.map((task) => task.toJSON())
      await fs.writeFile(this.filePath, JSON.stringify(tasksData, null, 2))
      return true
    } catch (error) {
      console.error("Error saving tasks:", error.message)
      return false
    }
  }

  async createBackup() {
    try {
      await fs.access(this.filePath)
      await fs.copyFile(this.filePath, this.backupPath)
    } catch (error) {
      // File doesn't exist yet, no backup needed
    }
  }

  async exportTasks(tasks, exportPath) {
    try {
      // Ensure exports directory exists
      const exportDir = path.dirname(exportPath)
      await fs.mkdir(exportDir, { recursive: true })

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
      const data = await fs.readFile(importPath, "utf8")
      const tasksData = JSON.parse(data)

      if (!Array.isArray(tasksData)) {
        throw new Error("Invalid import file format")
      }

      return tasksData.map((taskData) => Task.fromJSON(taskData))
    } catch (error) {
      console.error("Error importing tasks:", error.message)
      return null
    }
  }
}

module.exports = FileHandler
