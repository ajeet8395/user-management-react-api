# User Management Application

## Overview

This is a modern React-based User Management Application that provides comprehensive user management functionality with authentication, listing, searching, editing, and deleting users.

## Features

- 🔐 Secure Authentication
- 📋 User Listing with Pagination
- 🔍 User Search Functionality
- ✏️ User Profile Editing
- 🗑️ User Deletion
- 🛡️ Protected Routes
- 📱 Responsive Design

## Tech Stack

- React 18
- React Router
- Tailwind CSS
- Axios
- React Hook Form
- Context API for State Management

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/user-management-app.git
cd user-management-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

## Project Structure
```
user-management-app/
│
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Users/
│   │   └── Common/
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── UserContext.js
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── UsersPage.jsx
│   │   └── UserEditPage.jsx
│   ├── services/
│   │   └── authService.js
│   ├── utils/
│   │   └── storage.js
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── App.js
│   └── index.js
└── tailwind.config.js
```

## Authentication Credentials

- **Email**: eve.holt@reqres.in
- **Password**: cityslicka

## Environment Variables

No additional environment variables are required. The application uses the public Reqres API.

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner

## API Integration

The application uses [Reqres](https://reqres.in/) as the backend service, which provides:
- User authentication
- User listing
- User creation and modification
- User deletion

## State Management

The application uses React Context for global state management:
- `AuthContext`: Manages authentication state
- `UserContext`: Manages user-related data and operations

## Form Validation

Form validation is implemented using React Hook Form with validation rules for:
- Email format
- Password length
- Required fields

## Error Handling

Comprehensive error handling is implemented across:
- Authentication
- User operations
- API requests

## Responsive Design

The application is fully responsive, built with Tailwind CSS, and works seamlessly across:
- Mobile devices
- Tablets
- Desktop computers

## Future Improvements

- Implement user creation functionality
- Add more advanced search filters
- Integrate role-based access control
- Enhance error handling
- Add unit and integration tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/user-management-app](https://github.com/yourusername/user-management-app)