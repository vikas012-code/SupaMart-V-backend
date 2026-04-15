# Server Directory Structure

This project follows a clean architecture pattern for better organization and maintainability.

## Directory Layout

```
server/
├── src/
│   ├── config/          # Configuration files
│   │   └── database.js  # Database connection setup
│   ├── controllers/     # Request handlers
│   │   ├── user.controller.js
│   │   ├── product.controller.js
│   │   ├── order.controller.js
│   │   └── wishlist.controller.js
│   ├── models/          # Database models (Mongoose schemas)
│   │   ├── users.model.js
│   │   ├── products.model.js
│   │   ├── orders.model.js
│   │   └── wishlist.model.js
│   ├── routes/          # Route definitions
│   │   ├── user.route.js
│   │   ├── product.route.js
│   │   ├── order.route.js
│   │   └── wishlist.route.js
│   ├── services/        # Business logic layer (to be implemented)
│   │   └── README.md
│   ├── middleware/      # Custom middleware (to be implemented)
│   │   └── README.md
│   ├── utils/           # Utility functions (to be implemented)
│   │   └── README.md
│   ├── app.js           # Express app configuration
│   └── server.js        # Server entry point
├── .env                 # Environment variables
├── .gitignore
└── package.json
```

## Key Principles

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Controllers**: Handle HTTP requests and responses
3. **Models**: Define data structure and database interactions
4. **Routes**: Define API endpoints and map to controllers
5. **Services**: Business logic (recommended for complex operations)
6. **Middleware**: Request processing pipeline
7. **Config**: Centralized configuration management

## File Responsibilities

### Controllers
- Receive HTTP requests
- Validate input
- Call services/models
- Send HTTP responses

### Models
- Define database schemas
- Handle data validation
- Provide database query methods

### Routes
- Define API endpoints
- Map routes to controllers
- Apply middleware

### Services (Future)
- Complex business logic
- Data transformation
- Third-party API integration

### Middleware (Future)
- Authentication
- Authorization
- Request validation
- Error handling

## Entry Points

- **server.js**: Starts the HTTP server
- **app.js**: Configures Express app, middleware, and routes

## Benefits

- Clear separation of concerns
- Easy to test individual components
- Scalable for large applications
- Follows industry best practices
- Easy onboarding for new developers
