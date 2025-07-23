# Task Manager - OOP & File Management

A comprehensive command-line task management application built with Object-Oriented Programming principles and persistent file storage.

## Team Members
- **Belinda Belange Larose**
- **Grace Munezero**
- **Kevine Umutoni**
- **Plamedi Mayala**

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Object-Oriented Design](#object-oriented-design)
- [Data Storage](#data-storage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This Task Manager application demonstrates advanced Object-Oriented Programming concepts while providing a practical solution for personal productivity and task organization. Users can create, manage, and track tasks through an intuitive command-line interface with persistent data storage.

## Features

### Core Functionality
- ✅ **CRUD Operations**: Create, Read, Update, Delete tasks
- 📋 **Task Properties**: Title, description, priority, due date, category, completion status
- 🎯 **Task Types**: Regular tasks, Work tasks, Personal tasks
- 💾 **Data Persistence**: JSON file-based storage with automatic backup
- 🔍 **Search & Filter**: Find tasks by keywords, category, priority, or status
- 📊 **Sorting**: Sort by creation date, due date, priority, or title
- 📈 **Statistics**: Track completion rates and task analytics

### Advanced Features
- ⚠️ **Overdue Detection**: Automatic identification of overdue tasks
- 📅 **Due Date Tracking**: Monitor tasks approaching their due dates
- 🏷️ **Categorization**: Organize tasks by custom categories
- 📤 **Export/Import**: Backup and restore task data
- 🔒 **Data Validation**: Comprehensive input validation and error handling
- 🔄 **Auto-backup**: Automatic backup system prevents data loss

## Prerequisites

Before running this application, ensure you have:
- **Node.js** (version 14.0.0 or higher)
- **npm** (Node Package Manager)

You can check your versions by running:
```bash
node --version
npm --version
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-oop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

### Development Setup

For development work, you can use these additional commands:

```bash
# Install development dependencies
npm install --dev

# Run with auto-restart during development
npm run dev

# Run tests
npm test

# Code linting
npm run lint

# Code formatting
npm run format
```

## Usage

### Getting Started

1. Launch the application:
   ```bash
   npm start
   ```

2. You'll see the main menu with numbered options. Enter the number corresponding to your desired action.

### Main Menu Options

| Option | Description |
|--------|-------------|
| 1 | **Add Task** - Create a new task with full details |
| 2 | **View All Tasks** - Display all tasks in your list |
| 3 | **View Tasks by Filter** - Filter tasks by various criteria |
| 4 | **Update Task** - Modify existing task properties |
| 5 | **Delete Task** - Remove tasks from your list |
| 6 | **Toggle Task Completion** - Mark tasks as complete/incomplete |
| 7 | **Search Tasks** - Find tasks using keywords |
| 8 | **Task Statistics** - View productivity analytics |
| 9 | **Export/Import** - Backup or restore task data |
| 0 | **Exit** - Close the application |

### Creating Tasks

When adding a new task, you'll be prompted to enter:

- **Title** (required): A brief name for your task
- **Description** (optional): Detailed information about the task
- **Priority** (optional): High, Medium, or Low (default: Medium)
- **Due Date** (optional): Deadline in YYYY-MM-DD format
- **Category** (optional): Custom category for organization (default: General)
- **Task Type**: Choose between Regular, Work, or Personal tasks

### Filtering Tasks

You can filter tasks by:
- **Category**: Show tasks from specific categories
- **Priority**: Filter by High, Medium, or Low priority
- **Status**: Show completed or incomplete tasks
- **Overdue Tasks**: Display tasks past their due date
- **Due Soon**: Show tasks due within the next 7 days

### Searching Tasks

Use the search function to find tasks by entering keywords that match:
- Task titles
- Task descriptions
- Categories

## Project Structure

```
task-manager-oop/
├── index.js              # Main application entry point
├── src/                  # Source code directory
│   ├── Task.js          # Task class and specialized classes
│   ├── TaskManager.js   # Main task management logic
│   ├── FileHandler.js   # File I/O operations
│   ├── Validator.js     # Data validation utilities
│   └── CLI.js           # Command-line interface
├── package.json          # Project configuration and dependencies
├── README.md            # This documentation file
├── tasks.json           # Task data storage (auto-generated)
├── tasks_backup.json    # Automatic backup file (auto-generated)
├── tests/               # Test files directory
│   ├── task.test.js     # Task class tests
│   ├── taskManager.test.js # TaskManager tests
│   ├── fileHandler.test.js # File operations tests
│   └── validator.test.js # Validation tests
├── docs/                # Additional documentation
└── exports/             # Directory for exported task files
```

## Object-Oriented Design

This application demonstrates key OOP principles through its class structure:

### Core Classes

#### Task Class
The base class for all tasks with encapsulation using private fields:

```javascript
class Task {
    // Private fields for data protection
    #id; #title; #description; #priority; #dueDate; 
    #category; #completed; #createdAt;
    
    // Public methods for controlled access
    markComplete()
    markIncomplete()
    isOverdue()
    getDaysUntilDue()
    // ... getters and setters
}
```

#### Specialized Task Classes
Inheritance is demonstrated through specialized task types:

```javascript
class WorkTask extends Task {
    // Work-specific properties and methods
}

class PersonalTask extends Task {
    // Personal task specific features
}
```

#### TaskManager Class
Handles all task management operations:

```javascript
class TaskManager {
    addTask(taskData)
    updateTask(id, updates)
    deleteTask(id)
    searchTasks(keyword)
    filterTasks(criteria)
    sortTasks(sortBy)
    getTaskStats()
    exportTasks(filename)
    importTasks(filename)
}
```

#### FileHandler Class
Manages all file operations:

```javascript
class FileHandler {
    loadTasks()
    saveTasks(tasks)
    createBackup()
    exportTasks(tasks, filename)
    importTasks(filename)
}
```

#### Validator Class
Handles data validation and sanitization:

```javascript
class Validator {
    validateTaskData(data)
    validateId(id)
    sanitizeInput(input)
    isValidDate(dateString)
}
```

#### CLI Class
Manages the command-line interface:

```javascript
class CLI {
    showMainMenu()
    handleMenuChoice(choice)
    addTaskFlow()
    updateTaskFlow()
    deleteTaskFlow()
}
```

### OOP Principles Demonstrated

**Encapsulation**: Private fields protect data integrity, with controlled access through public methods.

**Inheritance**: Specialized task classes inherit from the base Task class, promoting code reuse.

**Polymorphism**: Different task types can be handled uniformly through the same interface.

**Abstraction**: Complex operations are hidden behind simple, intuitive method calls.

## Data Storage

### File Format
Tasks are stored in JSON format in the `tasks.json` file:

```json
[
  {
    "id": "task_1234567890_abc123",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and setup guide",
    "priority": "High",
    "dueDate": "2024-12-15T00:00:00.000Z",
    "category": "Work",
    "completed": false,
    "createdAt": "2024-12-01T10:30:00.000Z"
  }
]
```

### Backup System
- Automatic backup creation before each save operation
- Backup stored in `tasks_backup.json`
- Automatic recovery if main file becomes corrupted
- Manual export/import for additional backups

### Error Handling
The application includes comprehensive error handling for:
- File operation failures
- Invalid user input
- Data corruption
- Network issues (future cloud integration)
- Date format validation

## Testing

### Running Tests
Execute the test suite with:
```bash
npm test
```

### Test Coverage
Tests cover:
- Task class methods and properties
- TaskManager CRUD operations
- File handling and backup systems
- Search and filter functionality
- Data validation and sanitization
- Error handling scenarios

### Writing New Tests
When adding new features, ensure you:
1. Write unit tests for new methods
2. Test error conditions
3. Verify data persistence
4. Test user input validation

## Performance Considerations

- **Efficient Search**: Optimized algorithms for filtering and searching large task lists
- **Memory Management**: Proper cleanup of objects and resources
- **File I/O**: Minimized disk operations through intelligent caching
- **Error Recovery**: Graceful handling of failures without data loss

## Security Features

- **Input Sanitization**: All user inputs are validated and sanitized
- **File Path Validation**: Safe file operations prevent path traversal attacks
- **Data Integrity**: Validation ensures data consistency
- **Error Messages**: Secure error reporting without exposing sensitive information

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Write or update tests**
5. **Ensure all tests pass**
   ```bash
   npm test
   ```
6. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of changes"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create a Pull Request**

### Code Style Guidelines
- Use meaningful variable and function names
- Follow existing code formatting
- Add comments for complex logic
- Write tests for new features
- Update documentation as needed

## Future Enhancements

Planned features for upcoming versions:
- 📱 Web-based interface
- 🔄 Real-time collaboration
- 📊 Advanced analytics dashboard
- 🔔 Due date notifications
- ☁️ Cloud storage integration
- 📱 Mobile companion app
- 🔗 Third-party integrations (Google Calendar, Slack)

## Troubleshooting

### Common Issues

**Application won't start**
- Ensure Node.js is installed and updated
- Run `npm install` to install dependencies
- Check for error messages in the console

**Tasks not saving**
- Verify write permissions in the application directory
- Check available disk space
- Look for backup files if main storage fails

**Invalid date formats**
- Use YYYY-MM-DD format for dates
- Ensure dates are realistic (not in the past for due dates)

**Search not working**
- Check for typos in search terms
- Try broader search terms
- Ensure tasks exist in the specified category

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For questions, bug reports, or feature requests:
- 📧 Contact the development team through your course platform
- 🐛 Create an issue on the project repository
- 📖 Check the documentation in the `docs/` directory

## Acknowledgments

- Course instructors for guidance on OOP principles and best practices
- Node.js community for excellent documentation and tools
- Team members for collaborative development and peer review
- Beta testers for valuable feedback and suggestions

---

**Task Manager v1.0.0** - Built with ❤️ by Team Task Masters