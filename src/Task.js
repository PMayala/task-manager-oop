// Task Class Implementation
class Task {
  #id
  #title
  #description
  #priority
  #dueDate
  #category
  #completed
  #createdAt

  constructor(title, description, priority = "Medium", dueDate = null, category = "General") {
    this.#id = this.generateId()
    this.#title = this.validateTitle(title)
    this.#description = description || ""
    this.#priority = this.validatePriority(priority)
    this.#dueDate = dueDate ? new Date(dueDate) : null
    this.#category = category
    this.#completed = false
    this.#createdAt = new Date()
  }

  // Private methods
  generateId() {
    return "task_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
  }

  validateTitle(title) {
    if (!title || title.trim().length === 0) {
      throw new Error("Task title cannot be empty")
    }
    return title.trim()
  }

  validatePriority(priority) {
    const validPriorities = ["High", "Medium", "Low"]
    if (!validPriorities.includes(priority)) {
      throw new Error("Priority must be High, Medium, or Low")
    }
    return priority
  }

  // Getters
  get id() {
    return this.#id
  }
  get title() {
    return this.#title
  }
  get description() {
    return this.#description
  }
  get priority() {
    return this.#priority
  }
  get dueDate() {
    return this.#dueDate
  }
  get category() {
    return this.#category
  }
  get completed() {
    return this.#completed
  }
  get createdAt() {
    return this.#createdAt
  }

  // Setters with validation
  set title(newTitle) {
    this.#title = this.validateTitle(newTitle)
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

  // Public methods
  markComplete() {
    this.#completed = true
  }

  markIncomplete() {
    this.#completed = false
  }

  isOverdue() {
    if (!this.#dueDate || this.#completed) return false
    return new Date() > this.#dueDate
  }

  getDaysUntilDue() {
    if (!this.#dueDate) return null
    const today = new Date()
    const diffTime = this.#dueDate - today
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      priority: this.#priority,
      dueDate: this.#dueDate ? this.#dueDate.toISOString() : null,
      category: this.#category,
      completed: this.#completed,
      createdAt: this.#createdAt.toISOString(),
    }
  }

  static fromJSON(data) {
    const task = new Task(data.title, data.description, data.priority, data.dueDate, data.category)
    task.#id = data.id
    task.#completed = data.completed
    task.#createdAt = new Date(data.createdAt)
    return task
  }

  toString() {
    const status = this.#completed ? "✓" : "○"
    const overdue = this.isOverdue() ? " (OVERDUE)" : ""
    const dueInfo = this.#dueDate ? ` | Due: ${this.#dueDate.toLocaleDateString()}${overdue}` : ""
    return `[${status}] ${this.#title} | ${this.#priority} | ${this.#category}${dueInfo}`
  }
}

// Specialized Task Classes (Inheritance)
class WorkTask extends Task {
  constructor(title, description, priority, dueDate, project = "General") {
    super(title, description, priority, dueDate, "Work")
    this.project = project
  }

  toString() {
    const baseString = super.toString()
    return `${baseString} | Project: ${this.project}`
  }

  toJSON() {
    const baseJSON = super.toJSON()
    return { ...baseJSON, project: this.project }
  }

  static fromJSON(data) {
    const task = new WorkTask(data.title, data.description, data.priority, data.dueDate, data.project)
    task._id = data.id
    task._completed = data.completed
    task._createdAt = new Date(data.createdAt)
    return task
  }
}

class PersonalTask extends Task {
  constructor(title, description, priority, dueDate, location = null) {
    super(title, description, priority, dueDate, "Personal")
    this.location = location
  }

  toString() {
    const baseString = super.toString()
    const locationInfo = this.location ? ` | Location: ${this.location}` : ""
    return `${baseString}${locationInfo}`
  }

  toJSON() {
    const baseJSON = super.toJSON()
    return { ...baseJSON, location: this.location }
  }

  static fromJSON(data) {
    const task = new PersonalTask(data.title, data.description, data.priority, data.dueDate, data.location)
    task._id = data.id
    task._completed = data.completed
    task._createdAt = new Date(data.createdAt)
    return task
  }
}

module.exports = { Task, WorkTask, PersonalTask }
