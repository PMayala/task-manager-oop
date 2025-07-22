// Main Task Management Class
const FileHandler = require("./FileHandler")
const Validator = require("./Validator")
const { Task, WorkTask, PersonalTask } = require("./Task")

class TaskManager {
  constructor() {
    this.tasks = []
    this.fileHandler = new FileHandler()
  }

  async initialize() {
    this.tasks = await this.fileHandler.loadTasks()
    console.log(`Loaded ${this.tasks.length} tasks`)
  }

  // CRUD Operations
  async addTask(title, description, priority = "Medium", dueDate = null, category = "General", taskType = "regular") {
    try {
      const validation = Validator.validateTaskData({ title, priority, dueDate })
      if (!validation.isValid) {
        throw new Error(validation.errors.join(", "))
      }

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

      this.tasks.push(task)
      await this.saveTasks()
      return task
    } catch (error) {
      throw new Error(`Failed to add task: ${error.message}`)
    }
  }

  async updateTask(id, updates) {
    const task = this.findTaskById(id)
    if (!task) {
      throw new Error("Task not found")
    }

    // Validate updates
    const validation = Validator.validateTaskData(updates)
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "))
    }

    // Apply updates
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined && key in task) {
        task[key] = updates[key]
      }
    })

    await this.saveTasks()
    return task
  }

  async deleteTask(id) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }

    const deletedTask = this.tasks.splice(taskIndex, 1)[0]
    await this.saveTasks()
    return deletedTask
  }

  async toggleTaskCompletion(id) {
    const task = this.findTaskById(id)
    if (!task) {
      throw new Error("Task not found")
    }

    if (task.completed) {
      task.markIncomplete()
    } else {
      task.markComplete()
    }

    await this.saveTasks()
    return task
  }

  // Search and Filter Operations
  searchTasks(query) {
    const lowerQuery = query.toLowerCase()
    return this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description.toLowerCase().includes(lowerQuery) ||
        task.category.toLowerCase().includes(lowerQuery),
    )
  }

  filterByCategory(category) {
    return this.tasks.filter((task) => task.category.toLowerCase() === category.toLowerCase())
  }

  filterByPriority(priority) {
    return this.tasks.filter((task) => task.priority.toLowerCase() === priority.toLowerCase())
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

  // Sorting Operations
  sortTasks(sortBy = "createdAt", ascending = true) {
    const sortedTasks = [...this.tasks].sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case "priority":
          const priorityOrder = { High: 3, Medium: 2, Low: 1 }
          aValue = priorityOrder[a.priority]
          bValue = priorityOrder[b.priority]
          break
        case "dueDate":
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

      if (aValue < bValue) return ascending ? -1 : 1
      if (aValue > bValue) return ascending ? 1 : -1
      return 0
    })

    return sortedTasks
  }

  // Utility methods
  findTaskById(id) {
    return this.tasks.find((task) => task.id === id)
  }

  getAllTasks() {
    return [...this.tasks]
  }

  getTaskStats() {
    const total = this.tasks.length
    const completed = this.tasks.filter((t) => t.completed).length
    const pending = total - completed
    const overdue = this.getOverdueTasks().length
    const dueSoon = this.getTasksDueSoon().length

    return {
      total,
      completed,
      pending,
      overdue,
      dueSoon,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  }

  async saveTasks() {
    return await this.fileHandler.saveTasks(this.tasks)
  }

  async exportTasks(filePath) {
    return await this.fileHandler.exportTasks(this.tasks, filePath)
  }

  async importTasks(filePath) {
    const importedTasks = await this.fileHandler.importTasks(filePath)
    if (importedTasks) {
      this.tasks = [...this.tasks, ...importedTasks]
      await this.saveTasks()
      return importedTasks.length
    }
    return 0
  }

  // Advanced filtering with multiple criteria
  advancedFilter(criteria) {
    return this.tasks.filter((task) => {
      // Category filter
      if (criteria.category && task.category.toLowerCase() !== criteria.category.toLowerCase()) {
        return false
      }

      // Priority filter
      if (criteria.priority && task.priority.toLowerCase() !== criteria.priority.toLowerCase()) {
        return false
      }

      // Status filter
      if (criteria.completed !== undefined && task.completed !== criteria.completed) {
        return false
      }

      // Date range filter
      if (criteria.dateFrom && task.createdAt < new Date(criteria.dateFrom)) {
        return false
      }
      if (criteria.dateTo && task.createdAt > new Date(criteria.dateTo)) {
        return false
      }

      // Due date filter
      if (criteria.overdue !== undefined) {
        if (criteria.overdue && !task.isOverdue()) return false
        if (!criteria.overdue && task.isOverdue()) return false
      }

      return true
    })
  }
}

module.exports = TaskManager
