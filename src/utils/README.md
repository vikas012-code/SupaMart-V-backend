# Utils

This directory contains utility functions and helper modules.

## Purpose

Utility functions are reusable, pure functions that perform common tasks:
- Data formatting
- Validation helpers
- Date/time utilities
- String manipulation
- File operations

## Example Structure

```javascript
// dateUtils.js
export const formatDate = (date) => {
  return new Date(date).toISOString();
};

// validators.js
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// responseUtils.js
export const successResponse = (data, message = 'Success') => {
  return { success: true, message, data };
};

export const errorResponse = (message, statusCode = 500) => {
  return { success: false, message, statusCode };
};
```

## Best Practices

- Keep functions pure (no side effects)
- Make functions small and focused
- Add JSDoc comments for documentation
- Write unit tests for utilities
