const { Task, WorkTask, PersonalTask } = require("../index.js")

describe("Task Class", () => {
  describe("Task Creation", () => {
    test("should create a task with valid data", () => {
      const task = new Task("Test Task", "Test description", "High", "2024-12-31", "Work")

      expect(task.title).toBe("Test Task")
      expect(task.description).toBe("Test description")
      expect(task.priority).toBe("High")
      expect(task.category).toBe("Work")
      expect(task.completed).toBe(false)
      expect(task.id).toBeDefined()
      expect(task.createdAt).toBeInstanceOf(Date)
    })

    test("should throw error for empty title", () => {
      expect(() => new Task("", "Description")).toThrow("Task title cannot be empty")
    })

    test("should throw error for invalid priority", () => {
      expect(() => new Task("Test", "Description", "Invalid")).toThrow("Priority must be High, Medium, or Low")
    })

    test("should set default values correctly", () => {
      const task = new Task("Test Task")

      expect(task.priority).toBe("Medium")
      expect(task.description).toBe("")
      expect(task.dueDate).toBeNull()
      expect(task.completed).toBe(false)
    })
  })

  describe("Task Methods", () => {
    let task

    beforeEach(() => {
      task = new Task("Test Task", "Description", "High", "2024-12-31", "Work")
    })

    test("should mark task as complete", () => {
      task.markComplete()
      expect(task.completed).toBe(true)
    })

    test("should mark task as incomplete", () => {
      task.markComplete()
      task.markIncomplete()
      expect(task.completed).toBe(false)
    })

    test("should detect overdue tasks", () => {
      const overdueTask = new Task("Overdue Task", "", "High", "2020-01-01")
      expect(overdueTask.isOverdue()).toBe(true)

      const futureTask = new Task("Future Task", "", "High", "2030-01-01")
      expect(futureTask.isOverdue()).toBe(false)
    })

    test("should calculate days until due", () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)

      const taskDueTomorrow = new Task("Tomorrow Task", "", "High", tomorrow.toISOString().split("T")[0])
      expect(taskDueTomorrow.getDaysUntilDue()).toBe(1)
    })

    test("should not be overdue when completed", () => {
      const overdueTask = new Task("Overdue Task", "", "High", "2020-01-01")
      overdueTask.markComplete()
      expect(overdueTask.isOverdue()).toBe(false)
    })
  })

  describe("Task Serialization", () => {
    test("should serialize to JSON correctly", () => {
      const task = new Task("Test Task", "Description", "High", "2024-12-31", "Work")
      const json = task.toJSON()

      expect(json.title).toBe("Test Task")
      expect(json.description).toBe("Description")
      expect(json.priority).toBe("High")
      expect(json.category).toBe("Work")
      expect(json.completed).toBe(false)
      expect(json.id).toBeDefined()
      expect(json.createdAt).toBeDefined()
    })

    test("should deserialize from JSON correctly", () => {
      const jsonData = {
        id: "test_id",
        title: "Test Task",
        description: "Description",
        priority: "High",
        dueDate: "2024-12-31T00:00:00.000Z",
        category: "Work",
        completed: false,
        createdAt: "2024-01-01T00:00:00.000Z",
      }

      const task = Task.fromJSON(jsonData)
      expect(task.title).toBe("Test Task")
      expect(task.priority).toBe("High")
      expect(task.category).toBe("Work")
    })
  })

  describe("Task toString", () => {
    test("should display task information correctly", () => {
      const task = new Task("Test Task", "Description", "High", "2024-12-31", "Work")
      const taskString = task.toString()

      expect(taskString).toContain("Test Task")
      expect(taskString).toContain("High")
      expect(taskString).toContain("Work")
      expect(taskString).toContain("○") // Incomplete symbol
    })

    test("should show completed symbol for completed tasks", () => {
      const task = new Task("Test Task", "Description", "High", "2024-12-31", "Work")
      task.markComplete()
      const taskString = task.toString()

      expect(taskString).toContain("✓") // Complete symbol
    })
  })
})

describe("Specialized Task Classes", () => {
  describe("WorkTask", () => {
    test("should create work task with project", () => {
      const workTask = new WorkTask("Work Task", "Description", "High", "2024-12-31", "Project Alpha")

      expect(workTask.category).toBe("Work")
      expect(workTask.project).toBe("Project Alpha")
      expect(workTask.toString()).toContain("Project: Project Alpha")
    })
  })

  describe("PersonalTask", () => {
    test("should create personal task with location", () => {
      const personalTask = new PersonalTask("Personal Task", "Description", "Medium", "2024-12-31", "Home")

      expect(personalTask.category).toBe("Personal")
      expect(personalTask.location).toBe("Home")
      expect(personalTask.toString()).toContain("Location: Home")
    })
  })
})
