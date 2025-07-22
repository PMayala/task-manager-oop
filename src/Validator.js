// Validation Class
class Validator {
  static validateTaskData(data) {
    const errors = []

    if (!data.title || data.title.trim().length === 0) {
      errors.push("Title is required")
    }

    if (data.priority && !["High", "Medium", "Low"].includes(data.priority)) {
      errors.push("Priority must be High, Medium, or Low")
    }

    if (data.dueDate) {
      const date = new Date(data.dueDate)
      if (isNaN(date.getTime())) {
        errors.push("Invalid due date format")
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  static validateId(id) {
    return typeof id === "string" && id.length > 0
  }

  static sanitizeInput(input) {
    if (typeof input !== "string") return input
    return input.trim().replace(/[<>]/g, "")
  }
}

module.exports = Validator
