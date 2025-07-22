const { Validator } = require("../index.js")

describe("Validator Class", () => {
  describe("Task Data Validation", () => {
    test("should validate correct task data", () => {
      const taskData = {
        title: "Valid Task",
        priority: "High",
        dueDate: "2024-12-31",
      }

      const result = Validator.validateTaskData(taskData)
      expect(result.isValid).toBe(true)
      expect(result.errors.length).toBe(0)
    })

    test("should reject empty title", () => {
      const taskData = {
        title: "",
        priority: "High",
      }

      const result = Validator.validateTaskData(taskData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain("Title is required")
    })

    test("should reject invalid priority", () => {
      const taskData = {
        title: "Valid Task",
        priority: "Invalid Priority",
      }

      const result = Validator.validateTaskData(taskData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain("Priority must be High, Medium, or Low")
    })

    test("should reject invalid due date", () => {
      const taskData = {
        title: "Valid Task",
        dueDate: "invalid-date",
      }

      const result = Validator.validateTaskData(taskData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain("Invalid due date format")
    })
  })

  describe("ID Validation", () => {
    test("should validate correct ID", () => {
      const validId = "task_1234567890_abc123"
      expect(Validator.validateId(validId)).toBe(true)
    })

    test("should reject invalid ID", () => {
      expect(Validator.validateId("")).toBe(false)
      expect(Validator.validateId(null)).toBe(false)
      expect(Validator.validateId(123)).toBe(false)
    })
  })

  describe("Input Sanitization", () => {
    test("should sanitize string input", () => {
      const input = '  <script>alert("xss")</script>  '
      const sanitized = Validator.sanitizeInput(input)
      expect(sanitized).toBe('scriptalert("xss")/script')
    })

    test("should handle non-string input", () => {
      expect(Validator.sanitizeInput(123)).toBe(123)
      expect(Validator.sanitizeInput(null)).toBe(null)
      expect(Validator.sanitizeInput(undefined)).toBe(undefined)
    })
  })
})
