# Services

This directory contains business logic and service layer code.

## Purpose

Services encapsulate complex business logic that doesn't belong in controllers or models:
- Data transformation and processing
- Integration with third-party APIs
- Complex calculations
- Orchestration of multiple model operations

## Example Structure

```javascript
// userService.js
import Users from '../models/users.model.js';

export const getUserProfile = async (userId) => {
  // Complex business logic here
  const user = await Users.findById(userId);
  // Transform data, add computed fields, etc.
  return transformedUser;
};
```

## Benefits

- Keeps controllers thin and focused on HTTP concerns
- Makes business logic reusable across different controllers
- Easier to test business logic in isolation
- Clearer separation of concerns
