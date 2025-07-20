# API Documentation

## Task Class

### Constructor
```javascript
new Task(title, description, priority, dueDate, category)
```

### Methods

#### `markComplete()`
Marks the task as completed.

#### `markIncomplete()`
Marks the task as incomplete.

#### `isOverdue()`
Returns `true` if the task is overdue, `false` otherwise.

#### `getDaysUntilDue()`
Returns the number of days until the task is due, or `null` if no due date.

#### `toJSON()`
Serializes the task to JSON format for storage.

#### `static fromJSON(data)`
Creates a Task instance from JSON data.

## TaskManager Class

### Methods

#### `async addTask(title, description, priority, dueDate, category, taskType)`
Adds a new task to the system.

**Parameters:**
- `title` (string): Task title (required)
- `description` (string): Task description (optional)
- `priority` (string): Priority level (High/Medium/Low)
- `dueDate` (string): Due date in YYYY-MM-DD format (optional)
- `category` (string): Task category
- `taskType` (string): Type of task (regular/work/personal)

**Returns:** Task instance

#### `async updateTask(id, updates)`
Updates an existing task.

**Parameters:**
- `id` (string): Task ID
- `updates` (object): Object containing fields to update

#### `async deleteTask(id)`
Deletes a task by ID.

**Parameters:**
- `id` (string): Task ID

**Returns:** Deleted task instance

#### `searchTasks(query)`
Searches tasks by keyword.

**Parameters:**
- `query` (string): Search query

**Returns:** Array of matching tasks

#### `filterByCategory(category)`
Filters tasks by category.

**Parameters:**
- `category` (string): Category name

**Returns:** Array of filtered tasks

#### `filterByPriority(priority)`
Filters tasks by priority level.

**Parameters:**
- `priority` (string): Priority level (High/Medium/Low)

**Returns:** Array of filtered tasks

#### `getOverdueTasks()`
Returns all overdue tasks.

**Returns:** Array of overdue tasks

#### `getTaskStats()`
Returns task statistics.

**Returns:** Object with statistics:
```javascript
{
  total: number,
  completed: number,
  pending: number,
  overdue: number,
  dueSoon: number,
  completionRate: number
}
```

## FileHandler Class

### Methods

#### `async loadTasks()`
Loads tasks from the JSON file.

**Returns:** Array of Task instances

#### `async saveTasks(tasks)`
Saves tasks to the JSON file.

**Parameters:**
- `tasks` (Array): Array of Task instances

**Returns:** Boolean indicating success

#### `async exportTasks(tasks, filePath)`
Exports tasks to a specified file.

**Parameters:**
- `tasks` (Array): Array of Task instances
- `filePath` (string): Export file path

**Returns:** Boolean indicating success

#### `async importTasks(filePath)`
Imports tasks from a specified file.

**Parameters:**
- `filePath` (string): Import file path

**Returns:** Array of Task instances or null if failed

## Validator Class

### Static Methods

#### `validateTaskData(data)`
Validates task data.

**Parameters:**
- `data` (object): Task data to validate

**Returns:** Object with validation result:
```javascript
{
  isValid: boolean,
  errors: Array<string>
}
```

#### `validateId(id)`
Validates task ID format.

**Parameters:**
- `id` (string): Task ID

**Returns:** Boolean indicating validity

#### `sanitizeInput(input)`
Sanitizes user input.

**Parameters:**
- `input` (string): Input to sanitize

**Returns:** Sanitized string
```
```
