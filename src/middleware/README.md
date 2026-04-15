# Middleware

This directory contains custom Express middleware functions.

## Purpose

Middleware functions process requests before they reach controllers:
- Authentication and authorization
- Request validation
- Error handling
- Logging
- Rate limiting

## Example Structure

```javascript
// auth.middleware.js
export const authenticate = (req, res, next) => {
  // Check authentication
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// validation.middleware.js
export const validateUser = (req, res, next) => {
  // Validate request body
  if (!req.body.email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  next();
};
```

## Usage

```javascript
// In routes
import { authenticate } from '../middleware/auth.middleware.js';

route.get('/protected', authenticate, controller);
```
