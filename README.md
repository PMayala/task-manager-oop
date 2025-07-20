# Task Manager - OOP & File Management

A comprehensive command-line task management application built with Object-Oriented Programming principles and persistent file storage.

## Team Members
- **Belinda Belange Larose**
- **Grace Munezero**
- **Kevine Umutoni**
- **Plamedi Mayala**

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

## Installation & Setup

### Prerequisites
- Node.js (version 14.0.0 or higher)
- npm (Node Package Manager)

### Installation Steps

1. **Install Dependencies**
\`\`\`bash
npm install
\`\`\`

2. **Run the Application**
\`\`\`bash
npm start
\`\`\`

### Development Setup

1. **Install Development Dependencies**
\`\`\`bash
npm install --dev
\`\`\`

2. **Run with Auto-restart (Development)**
\`\`\`bash
npm run dev
\`\`\`

3. **Run Tests**
\`\`\`bash
npm test
\`\`\`

4. **Code Linting**
\`\`\`bash
npm run lint
\`\`\`

5. **Code Formatting**
\`\`\`bash
npm run format
\`\`\`

## Usage Guide

### Starting the Application
Run \`npm start\` to launch the Task Manager. You'll see the main menu with the following options:

### Main Menu Options

1. **Add Task** - Create a new task with full details
2. **View All Tasks** - Display all tasks in your list
3. **View Tasks by Filter** - Filter tasks by various criteria
4. **Update Task** - Modify existing task properties
5. **Delete Task** - Remove tasks from your list
6. **Toggle Task Completion** - Mark tasks as complete/incomplete
7. **Search Tasks** - Find tasks using keywords
8. **Task Statistics** - View productivity analytics
9. **Export/Import** - Backup or restore task data
0. **Exit** - Close the application

### Task Properties

When creating tasks, you can specify:
- **Title**: Required task name
- **Description**: Optional detailed description
- **Priority**: High, Medium, or Low (default: Medium)
- **Due Date**: Optional deadline (YYYY-MM-DD format)
- **Category**: Custom category for organization (default: General)
- **Task Type**: Regular, Work, or Personal tasks

### Filtering Options

- **By Category**: Show tasks from specific categories
- **By Priority**: Filter by High, Medium, or Low priority
- **By Status**: Show completed or incomplete tasks
- **Overdue Tasks**: Display tasks past their due date
- **Due Soon**: Show tasks due within the next 7 days

## File Structure

\`\`\`
task-manager-oop/
├── index.js              # Main application file
├── src/                  # Source code directory
│   ├── Task.js          # Task class and specialized classes
│   ├── TaskManager.js   # Main task management logic
│   ├── FileHandler.js   # File I/O operations
│   ├── Validator.js     # Data validation
│   └── CLI.js           # Command-line interface
├── package.json          # Project configuration
├── README.md            # Project documentation
├── tasks.json           # Task data storage (auto-generated)
├── tasks_backup.json    # Automatic backup file
├── tests/               # Test files
├── docs/                # Additional documentation
└── exports/             # Exported task files
\`\`\`

## Object-Oriented Design

### Core Classes

#### 1. Task Class
\`\`\`javascript
class Task {
    // Private fields with encapsulation
    #id, #title, #description, #priority, #dueDate, #category, #completed, #createdAt
    
    // Public methods
    markComplete()
    markIncomplete()
    isOverdue()
    getDaysUntilDue()
}
\`\`\`

#### 2. Specialized Task Classes (Inheritance)
\`\`\`javascript
class WorkTask extends Task {
    // Additional work-specific properties and methods
}

class PersonalTask extends Task {
    // Additional personal task features
}
\`\`\`

#### 3. TaskManager Class
\`\`\`javascript
class TaskManager {
    // Main business logic
    addTask(), updateTask(), deleteTask()
    searchTasks(), filterTasks(), sortTasks()
    getTaskStats(), exportTasks(), importTasks()
}
\`\`\`

#### 4. FileHandler Class
\`\`\`javascript
class FileHandler {
    // File I/O operations
    loadTasks(), saveTasks()
    createBackup(), exportTasks(), importTasks()
}
\`\`\`

#### 5. Validator Class
\`\`\`javascript
class Validator {
    // Data validation and sanitization
    validateTaskData(), validateId(), sanitizeInput()
}
\`\`\`

#### 6. CLI Class
\`\`\`javascript
class CLI {
    // Command-line interface management
    showMainMenu(), handleMenuChoice()
    addTaskFlow(), updateTaskFlow(), deleteTaskFlow()
}
\`\`\`

### OOP Principles Demonstrated

#### Encapsulation
- Private fields (\`#\`) protect sensitive data
- Public methods provide controlled access
- Getter/setter methods with validation

#### Inheritance
- Base \`Task\` class with specialized subclasses
- Common interface for different task types
- Code reuse through inheritance hierarchy

#### Polymorphism
- Method overriding in specialized task classes
- Common interface for various task operations
- Dynamic behavior based on task type

#### Abstraction
- Abstract interfaces for file operations
- Simplified public API hiding complex internal operations
- Clear separation of concerns

## Data Storage

### JSON File Format
Tasks are stored in JSON format with the following structure:

\`\`\`json
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
\`\`\`

### Backup System
- Automatic backup creation before each save operation
- Backup file: \`tasks_backup.json\`
- Automatic recovery if main file is corrupted
- Manual export/import functionality for additional backups

## Error Handling

The application includes comprehensive error handling:

- **File Operation Errors**: Graceful handling of file read/write issues
- **Data Validation**: Input validation with clear error messages
- **Backup Recovery**: Automatic fallback to backup files
- **User Input Errors**: Validation of menu choices and task data
- **Date Format Validation**: Proper date parsing and validation

## Testing

### Running Tests
\`\`\`bash
npm test
\`\`\`

### Test Coverage
The application includes tests for:
- Task class methods and validation
- TaskManager CRUD operations
- File handling operations
- Search and filter functionality
- Data validation and sanitization

### Test Files Structure
\`\`\`
tests/
├── task.test.js         # Task class tests
├── taskManager.test.js  # TaskManager tests
├── fileHandler.test.js  # File operations tests
└── validator.test.js    # Validation tests
\`\`\`

## Performance Features

- **Efficient Filtering**: Optimized search and filter algorithms
- **Memory Management**: Proper object cleanup and memory usage
- **File I/O Optimization**: Minimized file operations with batching
- **Error Recovery**: Robust error handling with graceful degradation

## Security Features

- **Input Sanitization**: Protection against malicious input
- **Data Validation**: Comprehensive validation of all user inputs
- **File Path Security**: Safe file operations with path validation
- **Error Information**: Secure error messages without sensitive data exposure

## Future Enhancements

Planned features for future versions:
- 📱 Web interface integration
- 🔄 Real-time collaboration features
- 📊 Advanced analytics and reporting
- 🔔 Notification system for due dates
- 📱 Mobile application companion
- ☁️ Cloud storage integration

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or support, please contact the development team:
- Create an issue on GitHub
- Contact team members through the course platform

## Acknowledgments

- Course instructors for guidance on OOP principles
- Node.js community for excellent documentation
- Team members for collaborative development effort

---

**Task Manager v1.0.0** - Built with ❤️ by Team Task Masters
