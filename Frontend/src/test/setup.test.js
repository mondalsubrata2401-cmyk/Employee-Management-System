/**
 * Test to verify testing infrastructure is set up correctly
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  employeeArb,
  taskArb,
  alertArb,
  workloadLevelArb,
  experienceLevelArb,
  skillArb
} from './generators';
import {
  createMockEmployee,
  createMockTask,
  createMockAlert
} from './testUtils';

describe('Testing Infrastructure Setup', () => {
  describe('fast-check generators', () => {
    it('should generate valid employee data', () => {
      fc.assert(
        fc.property(employeeArb(), (employee) => {
          expect(employee).toBeDefined();
          expect(employee.id).toBeDefined();
          expect(employee.name).toBeDefined();
          expect(employee.email).toBeDefined();
          expect(employee.workload).toBeDefined();
          expect(employee.productivity).toBeDefined();
          expect(employee.skills).toBeInstanceOf(Array);
          expect(employee.skills.length).toBeGreaterThan(0);
        }),
        { numRuns: 10 }
      );
    });

    it('should generate valid task data', () => {
      fc.assert(
        fc.property(taskArb(), (task) => {
          expect(task).toBeDefined();
          expect(task.id).toBeDefined();
          expect(task.title).toBeDefined();
          expect(task.category).toBeDefined();
          expect(task.priority).toBeDefined();
          expect(task.complexity).toBeDefined();
          expect(task.estimatedHours).toBeGreaterThan(0);
        }),
        { numRuns: 10 }
      );
    });

    it('should generate valid alert data', () => {
      fc.assert(
        fc.property(alertArb(), (alert) => {
          expect(alert).toBeDefined();
          expect(alert.id).toBeDefined();
          expect(alert.type).toBeDefined();
          expect(alert.severity).toBeDefined();
          expect(alert.message).toBeDefined();
          expect(alert.employeeId).toBeDefined();
        }),
        { numRuns: 10 }
      );
    });

    it('should generate valid workload levels', () => {
      fc.assert(
        fc.property(workloadLevelArb(), (level) => {
          expect(['Low', 'Balanced', 'High', 'Overloaded']).toContain(level);
        }),
        { numRuns: 10 }
      );
    });

    it('should generate valid experience levels', () => {
      fc.assert(
        fc.property(experienceLevelArb(), (level) => {
          expect(['Junior', 'Mid', 'Senior', 'Lead']).toContain(level);
        }),
        { numRuns: 10 }
      );
    });

    it('should generate valid skills', () => {
      fc.assert(
        fc.property(skillArb(), (skill) => {
          expect(skill).toBeDefined();
          expect(skill.name).toBeDefined();
          expect(skill.level).toBeDefined();
          expect(['New', 'Comfortable', 'Expert']).toContain(skill.level);
          expect(skill.yearsExp).toBeGreaterThanOrEqual(0);
        }),
        { numRuns: 10 }
      );
    });
  });

  describe('Mock data creators', () => {
    it('should create valid mock employee', () => {
      const employee = createMockEmployee();
      
      expect(employee).toBeDefined();
      expect(employee.id).toBe('emp001');
      expect(employee.name).toBe('Test Employee');
      expect(employee.workload).toBeDefined();
      expect(employee.productivity).toBeDefined();
      expect(employee.skills).toBeInstanceOf(Array);
    });

    it('should create mock employee with overrides', () => {
      const employee = createMockEmployee({
        name: 'Custom Name',
        role: 'Custom Role'
      });
      
      expect(employee.name).toBe('Custom Name');
      expect(employee.role).toBe('Custom Role');
      expect(employee.id).toBe('emp001'); // Default value preserved
    });

    it('should create valid mock task', () => {
      const task = createMockTask();
      
      expect(task).toBeDefined();
      expect(task.id).toBe('task001');
      expect(task.title).toBe('Test Task');
      expect(task.category).toBe('Development');
      expect(task.priority).toBe('Medium');
    });

    it('should create mock task with overrides', () => {
      const task = createMockTask({
        title: 'Custom Task',
        priority: 'High'
      });
      
      expect(task.title).toBe('Custom Task');
      expect(task.priority).toBe('High');
      expect(task.id).toBe('task001'); // Default value preserved
    });

    it('should create valid mock alert', () => {
      const alert = createMockAlert();
      
      expect(alert).toBeDefined();
      expect(alert.id).toBe('alert001');
      expect(alert.type).toBe('overload');
      expect(alert.severity).toBe('warning');
      expect(alert.actionable).toBe(true);
    });

    it('should create mock alert with overrides', () => {
      const alert = createMockAlert({
        type: 'performance_decline',
        severity: 'critical'
      });
      
      expect(alert.type).toBe('performance_decline');
      expect(alert.severity).toBe('critical');
      expect(alert.id).toBe('alert001'); // Default value preserved
    });
  });
});
