# Testing Infrastructure

This directory contains the testing infrastructure for the Employee Snapshot Analytics feature.

## Overview

The testing setup includes:
- **Vitest** as the test runner
- **@testing-library/react** for component testing
- **fast-check** for property-based testing
- Custom test utilities and data generators

## Files

### `setup.js`
Test setup file that configures the testing environment:
- Imports `@testing-library/jest-dom` for DOM matchers
- Configures automatic cleanup after each test

### `generators.js`
Property-based test data generators using fast-check:
- Generates random but valid Employee, Task, Alert, and related data types
- Ensures generated data conforms to type constraints
- Used for property-based testing to verify universal properties

**Available Generators:**
- `employeeArb()` - Complete employee objects
- `taskArb()` - Task objects
- `taskAssignmentArb()` - Task assignment objects
- `alertArb()` - Alert objects
- `skillArb()` - Skill objects
- `workloadMetricsArb()` - Workload metrics
- `productivityMetricsArb()` - Productivity metrics
- `performanceMetricsArb()` - Performance metrics
- `qualityMetricsArb()` - Quality metrics
- `behavioralMetricsArb()` - Behavioral metrics
- `timeEntryArb()` - Time tracking entries
- `teamStatisticsArb()` - Team-level statistics
- And many more enum and type generators

### `testUtils.jsx`
Testing utilities for rendering components with contexts:
- `renderWithProviders()` - Renders components with all context providers
- `renderWithRouter()` - Renders components with Router only
- `createMockUserContext()` - Creates mock UserContext values
- `createMockTasksContext()` - Creates mock TasksContext values
- `createMockThemeContext()` - Creates mock ThemeContext values
- `createMockEmployee()` - Creates mock employee data
- `createMockTask()` - Creates mock task data
- `createMockAlert()` - Creates mock alert data
- `wait()` - Helper for async operations

## Usage

### Property-Based Testing

Property-based tests verify that properties hold for all valid inputs:

```javascript
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { employeeArb, workloadLevelArb } from './test/generators';

describe('Workload Calculations', () => {
  it('should always return valid workload level', () => {
    // Feature: employee-snapshot-analytics, Property 3: Workload Level Categorization
    fc.assert(
      fc.property(employeeArb(), (employee) => {
        const level = calculateWorkloadLevel(employee);
        expect(['Low', 'Balanced', 'High', 'Overloaded']).toContain(level);
      }),
      { numRuns: 100 } // Run 100 iterations
    );
  });
});
```

### Unit Testing with Mock Data

Unit tests verify specific examples and edge cases:

```javascript
import { describe, it, expect } from 'vitest';
import { createMockEmployee } from './test/testUtils';

describe('Workload Calculations', () => {
  it('should return Low for 0-2 tasks', () => {
    const employee = createMockEmployee({
      workload: { activeTasks: 2 }
    });
    
    const level = calculateWorkloadLevel(employee);
    expect(level).toBe('Low');
  });
});
```

### Component Testing

Test React components with contexts:

```javascript
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders, createMockEmployee } from './test/testUtils';
import EmployeeSnapshotPanel from '../components/admin/EmployeeSnapshotPanel';

describe('EmployeeSnapshotPanel', () => {
  it('should render employee information', () => {
    const employee = createMockEmployee();
    
    renderWithProviders(
      <EmployeeSnapshotPanel employeeId={employee.id} />
    );
    
    expect(screen.getByText(employee.name)).toBeInTheDocument();
  });
});
```

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Best Practices

1. **Property-Based Tests**: Use for universal properties that should hold for all inputs
2. **Unit Tests**: Use for specific examples, edge cases, and error conditions
3. **Minimum 100 iterations**: Configure property tests with `{ numRuns: 100 }`
4. **Tag property tests**: Include comment with feature name and property number
5. **Use generators**: Prefer fast-check generators over manual test data creation
6. **Mock contexts**: Use `renderWithProviders()` for components that need contexts
7. **Test real functionality**: Avoid mocking core logic - test actual implementations

## Configuration

Test configuration is in `vitest.config.js`:
- Environment: jsdom (for DOM testing)
- Setup file: `src/test/setup.js`
- Globals enabled for describe/it/expect
