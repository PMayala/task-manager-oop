const { TaskManager, Task } = require("../index.js")
const fs = require("fs").promises

describe("TaskManager Class", () => {
  let taskManager

  beforeEach(async () => {
    taskManager = new TaskManager()
    // Clear any existing test files
    try {
      await fs.unlink("./test_tasks.json")
      await fs.unlink("./test_tasks_backup.json")
    } catch (error) {
      // Files don't exist, which is fine
    }
  })

  afterEach(async () => {
    // Clean up test files
    try {
      await fs.unlink("./test_tasks.json")
      await fs.unlink("./test_tasks_backup.json")
    } catch (error) {
      // Files don't exist, which is fine
    }
  })

  describe("Task CRUD Operations", () => {
    test("should add a new task", async () => {
      const task = await taskManager.addTask("Test Task", "Description", "High", "2024-12-31", "Work")

      expect(task).toBeInstanceOf(Task)
      expect(task.title).toBe("Test Task")
      expect(taskManager.tasks.length).toBe(1)
    })

    test("should throw error for invalid task data", async () => {
      await expect(taskManager.addTask("", "Description")).rejects.toThrow("Failed to add task: Title is required")
    })

    test("should update existing task", async () => {
      const task = await taskManager.addTask("Original Task", "Description")
      await taskManager.updateTask(task.id, { title: "Updated Task", priority: "High" })

      expect(task.title).toBe("Updated Task")
      expect(task.priority).toBe("High")
    })

    test("should delete existing task", async () => {
      const task = await taskManager.addTask("Task to Delete", "Description")
      const deletedTask = await taskManager.deleteTask(task.id)

      expect(deletedTask).toBe(task)
      expect(taskManager.tasks.length).toBe(0)
    })

    test("should toggle task completion", async () => {
      const task = await taskManager.addTask("Toggle Task", "Description")
      await taskManager.toggleTaskCompletion(task.id)

      expect(task.completed).toBe(true)

      await taskManager.toggleTaskCompletion(task.id)
      expect(task.completed).toBe(false)
    })
  })

  describe("Search and Filter Operations", () => {
    beforeEach(async () => {
      // Create a future task (not overdue)
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 30) // 30 days from now
      await taskManager.addTask(
        "Work Task",
        "Work related task",
        "High",
        futureDate.toISOString().split("T")[0],
        "Work",
      )

      // Create another future task (not overdue)
      const anotherFutureDate = new Date()
      anotherFutureDate.setDate(anotherFutureDate.getDate() + 60) // 60 days from now
      await taskManager.addTask(
        "Personal Task",
        "Personal task",
        "Medium",
        anotherFutureDate.toISOString().split("T")[0],
        "Personal",
      )

      // Create a definitely overdue task
      await taskManager.addTask("Urgent Task", "Urgent matter", "High", "2020-01-01", "Urgent")
    })

    test("should search tasks by title", () => {
      const results = taskManager.searchTasks("Work")
      expect(results.length).toBe(1)
      expect(results[0].title).toBe("Work Task")
    })

    test("should filter by category", () => {
      const results = taskManager.filterByCategory("Work")
      expect(results.length).toBe(1)
      expect(results[0].category).toBe("Work")
    })

    test("should filter by priority", () => {
      const results = taskManager.filterByPriority("High")
      expect(results.length).toBe(2)
    })

    test("should filter by completion status", () => {
      taskManager.tasks[0].markComplete()
      const completedTasks = taskManager.filterByStatus(true)
      const incompleteTasks = taskManager.filterByStatus(false)

      expect(completedTasks.length).toBe(1)
      expect(incompleteTasks.length).toBe(2)
    })

    test("should identify overdue tasks", () => {
      const overdueTasks = taskManager.getOverdueTasks()
      expect(overdueTasks.length).toBe(1)
      expect(overdueTasks[0].title).toBe("Urgent Task")
    })
  })

  describe("Sorting Operations", () => {
    beforeEach(async () => {
      await taskManager.addTask("A Task", "First task", "Low", "2024-12-31", "Work")
      await taskManager.addTask("Z Task", "Last task", "High", "2024-01-01", "Personal")
      await taskManager.addTask("M Task", "Middle task", "Medium", "2024-06-15", "General")
    })

    test("should sort by title", () => {
      const sorted = taskManager.sortTasks("title")
      expect(sorted[0].title).toBe("A Task")
      expect(sorted[2].title).toBe("Z Task")
    })

    test("should sort by priority", () => {
      const sorted = taskManager.sortTasks("priority", false) // Descending
      expect(sorted[0].priority).toBe("High")
      expect(sorted[2].priority).toBe("Low")
    })

    test("should sort by due date", () => {
      const sorted = taskManager.sortTasks("dueDate")
      expect(sorted[0].title).toBe("Z Task") // Earliest due date
      expect(sorted[2].title).toBe("A Task") // Latest due date
    })
  })

  describe("Task Statistics", () => {
    beforeEach(async () => {
      const task1 = await taskManager.addTask("Task 1", "Description")
      const task2 = await taskManager.addTask("Task 2", "Description")
      await taskManager.addTask("Task 3", "Description")

      task1.markComplete()
      task2.markComplete()
    })

    test("should calculate statistics correctly", () => {
      const stats = taskManager.getTaskStats()

      expect(stats.total).toBe(3)
      expect(stats.completed).toBe(2)
      expect(stats.pending).toBe(1)
      expect(stats.completionRate).toBe(67) // Rounded percentage
    })
  })

  describe("Advanced Filtering", () => {
    beforeEach(async () => {
      await taskManager.addTask("Work Task 1", "Description", "High", "2024-12-31", "Work")
      await taskManager.addTask("Work Task 2", "Description", "Medium", "2025-01-15", "Work")
      await taskManager.addTask("Personal Task", "Description", "Low", "2024-06-15", "Personal")
    })

    test("should apply multiple filter criteria", () => {
      const results = taskManager.advancedFilter({
        category: "Work",
        priority: "High",
      })

      expect(results.length).toBe(1)
      expect(results[0].title).toBe("Work Task 1")
    })

    test("should filter by date range", () => {
      // Use a wide date range that should include all tasks
      const results = taskManager.advancedFilter({
        dateFrom: "2020-01-01",
        dateTo: "2030-12-31",
      })

      expect(results.length).toBe(3) // All tasks should be included
    })
  })
})
