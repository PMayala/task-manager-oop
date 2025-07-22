const { FileHandler } = require("../index.js")
const fs = require("fs").promises

describe("FileHandler Class", () => {
  let fileHandler
  const testFilePath = "./test_tasks.json"
  const testBackupPath = "./test_tasks_backup.json"

  beforeEach(() => {
    fileHandler = new FileHandler(testFilePath, testBackupPath)
  })

  afterEach(async () => {
    // Clean up test files
    try {
      await fs.unlink(testFilePath)
      await fs.unlink(testBackupPath)
    } catch (error) {
      // Files don't exist, which is fine
    }
  })

  describe("File Operations", () => {
    test("should create file if it does not exist", async () => {
      await fileHandler.ensureFileExists()

      // Check if file exists by trying to read it
      const fileContent = await fs.readFile(testFilePath, "utf8")
      const data = JSON.parse(fileContent)
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBe(0)
    })

    test("should save and load tasks", async () => {
      const testTasks = [
        { id: "1", title: "Task 1", completed: false },
        { id: "2", title: "Task 2", completed: true },
      ]

      // Mock Task objects with toJSON method
      const mockTasks = testTasks.map((data) => ({
        ...data,
        toJSON: () => data,
      }))

      await fileHandler.saveTasks(mockTasks)

      // Verify file was created and contains correct data
      const fileContent = await fs.readFile(testFilePath, "utf8")
      const savedData = JSON.parse(fileContent)

      expect(savedData.length).toBe(2)
      expect(savedData[0].title).toBe("Task 1")
      expect(savedData[1].completed).toBe(true)
    })

    test("should create backup before saving", async () => {
      // Create initial file
      const initialTasks = [{ id: "1", title: "Initial Task", toJSON: () => ({ id: "1", title: "Initial Task" }) }]
      await fileHandler.saveTasks(initialTasks)

      // Save new data (should create backup)
      const newTasks = [{ id: "2", title: "New Task", toJSON: () => ({ id: "2", title: "New Task" }) }]
      await fileHandler.saveTasks(newTasks)

      // Check that backup exists
      const backupContent = await fs.readFile(testBackupPath, "utf8")
      const backupData = JSON.parse(backupContent)
      expect(backupData[0].title).toBe("Initial Task")
    })
  })

  describe("Export/Import Operations", () => {
    test("should export tasks to specified file", async () => {
      const exportPath = "./exported_test_tasks.json"
      const testTasks = [{ id: "1", title: "Export Task", toJSON: () => ({ id: "1", title: "Export Task" }) }]

      const success = await fileHandler.exportTasks(testTasks, exportPath)
      expect(success).toBe(true)

      // Verify export file
      const exportedContent = await fs.readFile(exportPath, "utf8")
      const exportedData = JSON.parse(exportedContent)
      expect(exportedData[0].title).toBe("Export Task")

      // Clean up export file
      await fs.unlink(exportPath)
    })

    test("should import tasks from specified file", async () => {
      const importPath = "./imported_test_tasks.json"
      const testTasks = [{ id: "1", title: "Import Task" }]

      // Write test data to import file
      await fs.writeFile(importPath, JSON.stringify(testTasks))

      const importedTasks = await fileHandler.importTasks(importPath)
      expect(importedTasks[0].title).toBe("Import Task")

      // Clean up import file
      await fs.unlink(importPath)
    })
  })
})
