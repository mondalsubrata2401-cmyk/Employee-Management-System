import { useState, useEffect } from 'react';
import { 
  Target,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  Calendar,
  Award,
  Zap,
  User
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../ui';
import { EMPLOYEES, getRecommendedEmployee, assessTaskRisk, TASK_COMPLEXITY_FACTORS } from '../../data/employeeData';
import { EmployeeSnapshot } from './EmployeeSnapshot';

/**
 * Task Assignment Panel Component
 * Smart task assignment with employee recommendations
 */
export const TaskAssignmentPanel = ({ isOpen, onClose, onAssign }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    category: 'Development',
    priority: 'Medium',
    dueDate: '',
    estimatedHours: 4,
    complexity: 'Medium'
  });

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [showSnapshot, setShowSnapshot] = useState(false);

  // Calculate recommendations when task details change
  useEffect(() => {
    if (taskData.category && taskData.priority && taskData.estimatedHours) {
      const recommended = getRecommendedEmployee(
        taskData.category,
        taskData.priority,
        taskData.estimatedHours
      );
      setRecommendations(recommended);
      
      // Only set default employee if none is selected yet
      // OR if the currently selected employee is no longer in the recommendations
      if (recommended.length > 0) {
        if (!selectedEmployee) {
          setSelectedEmployee(recommended[0].id);
        } else {
          // Check if currently selected employee is still in recommendations
          const isStillRecommended = recommended.some(emp => emp.id === selectedEmployee);
          if (!isStillRecommended) {
            // Current selection is not in new recommendations, switch to top recommendation
            setSelectedEmployee(recommended[0].id);
          }
        }
      }
    }
  }, [taskData.category, taskData.priority, taskData.estimatedHours, selectedEmployee]);

  // Update risk assessment when employee or due date changes
  useEffect(() => {
    if (selectedEmployee && taskData.dueDate && taskData.estimatedHours) {
      const employee = EMPLOYEES.find(emp => emp.id === selectedEmployee);
      if (employee) {
        const risk = assessTaskRisk(employee, taskData.estimatedHours, taskData.dueDate);
        setRiskAssessment(risk);
      }
    }
  }, [selectedEmployee, taskData.dueDate, taskData.estimatedHours]);

  // Calculate suggested deadline
  const getSuggestedDeadline = () => {
    if (!taskData.estimatedHours) return '';
    
    const complexityMultipliers = {
      'Low': 1.2,
      'Medium': 1.5,
      'High': 2.0
    };
    
    const multiplier = complexityMultipliers[taskData.complexity] || 1.5;
    const daysNeeded = Math.ceil((taskData.estimatedHours * multiplier) / 8); // 8 hour workdays
    
    const suggestedDate = new Date();
    suggestedDate.setDate(suggestedDate.getDate() + daysNeeded);
    
    return suggestedDate.toISOString().split('T')[0];
  };

  // Handle task assignment
  const handleAssign = () => {
    if (!taskData.title || !selectedEmployee || !taskData.dueDate) {
      return;
    }

    const assignedTask = {
      ...taskData,
      assignedTo: selectedEmployee,
      assignedDate: new Date().toISOString().split('T')[0],
      status: 'Not Started',
      progress: 0,
      timeSpent: 0,
      reworkCount: 0,
      bugCount: 0,
      approved: false
    };

    onAssign(assignedTask);
    
    // Reset form
    setTaskData({
      title: '',
      description: '',
      category: 'Development',
      priority: 'Medium',
      dueDate: '',
      estimatedHours: 4,
      complexity: 'Medium'
    });
    setSelectedEmployee(null);
    setShowSnapshot(false);
    onClose();
  };

  const selectedEmployeeData = selectedEmployee 
    ? EMPLOYEES.find(emp => emp.id === selectedEmployee)
    : null;

  const getRiskColor = (level) => {
    const colors = {
      'Low': { badge: 'success', text: 'text-[rgb(var(--success))]', bg: 'bg-[rgb(var(--success-bg))]' },
      'Medium': { badge: 'warning', text: 'text-[rgb(var(--warning))]', bg: 'bg-[rgb(var(--warning-bg))]' },
      'High': { badge: 'danger', text: 'text-[rgb(var(--error))]', bg: 'bg-[rgb(var(--error-bg))]' }
    };
    return colors[level] || colors['Low'];
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign New Task"
      size="large"
    >
      <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {/* Task Details Form */}
        <Card className="p-5">
          <h3 className="font-semibold text-[rgb(var(--text-primary))] mb-4 flex items-center gap-2">
            <Target size={18} className="text-[rgb(var(--primary))]" />
            Task Details
          </h3>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--text-secondary))] mb-1">
                Task Title *
              </label>
              <input
                type="text"
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                placeholder="Enter task title"
                className="w-full px-3 py-2 border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--text-secondary))] mb-1">
                Description
              </label>
              <textarea
                value={taskData.description}
                onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                placeholder="Enter task description"
                rows={3}
                className="w-full px-3 py-2 border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] resize-none"
              />
            </div>

            {/* Category and Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text-secondary))] mb-1">
                  Category *
                </label>
                <select
                  value={taskData.category}
                  onChange={(e) => setTaskData({ ...taskData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                >
                  <option>Development</option>
                  <option>Design</option>
                  <option>Review</option>
                  <option>Presentation</option>
                  <option>Documentation</option>
                  <option>Bug Fix</option>
                  <option>Feature</option>
                  <option>Meeting</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text-secondary))] mb-1">
                  Priority *
                </label>
                <select
                  value={taskData.priority}
                  onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            {/* Complexity and Estimated Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text-secondary))] mb-1">
                  Complexity Level
                </label>
                <select
                  value={taskData.complexity}
                  onChange={(e) => setTaskData({ ...taskData, complexity: e.target.value })}
                  className="w-full px-3 py-2 border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text-secondary))] mb-1">
                  Estimated Hours *
                </label>
                <input
                  type="number"
                  value={taskData.estimatedHours}
                  onChange={(e) => setTaskData({ ...taskData, estimatedHours: parseInt(e.target.value) || 0 })}
                  min="1"
                  max="100"
                  className="w-full px-3 py-2 border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                />
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--text-secondary))] mb-1">
                Due Date *
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={taskData.dueDate}
                  onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                  className="flex-1 px-3 py-2 border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                />
                <Button
                  variant="ghost"
                  onClick={() => setTaskData({ ...taskData, dueDate: getSuggestedDeadline() })}
                  className="whitespace-nowrap"
                >
                  <Calendar size={16} className="mr-1" />
                  Suggested
                </Button>
              </div>
              {taskData.estimatedHours > 0 && (
                <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
                  Suggested deadline: {new Date(getSuggestedDeadline()).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Employee Selection */}
        <Card className="p-5">
          <h3 className="font-semibold text-[rgb(var(--text-primary))] mb-4 flex items-center gap-2">
            <User size={18} className="text-[rgb(var(--primary))]" />
            Select Employee
          </h3>

          {recommendations.length > 0 && (
            <>
              {/* Top Recommendation Highlight */}
              <div className="mb-4 p-4 bg-[rgb(var(--success-bg))] border-2 border-[rgb(var(--success))] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={20} className="text-[rgb(var(--success))]" />
                  <span className="font-semibold text-[rgb(var(--text-primary))]">
                    Best Match: {recommendations[0].name}
                  </span>
                  <Badge type="success">
                    {recommendations[0].recommendationScore}% Match
                  </Badge>
                </div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  {recommendations[0].role} • {recommendations[0].workload.workloadLevel} Workload
                </p>
              </div>

              {/* Employee List */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {recommendations.map((employee) => (
                  <div
                    key={employee.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedEmployee === employee.id
                        ? 'border-[rgb(var(--primary))] bg-[rgb(var(--accent))]'
                        : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] hover:bg-[rgb(var(--muted))]'
                    }`}
                    onClick={() => setSelectedEmployee(employee.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--accent-foreground))] flex items-center justify-center text-white text-sm font-bold">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[rgb(var(--text-primary))]">
                              {employee.name}
                            </span>
                            <Badge type="neutral" className="text-xs">
                              {employee.experienceLevel}
                            </Badge>
                          </div>
                          <p className="text-sm text-[rgb(var(--text-secondary))]">
                            {employee.role}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap size={14} className="text-[rgb(var(--warning))]" />
                          <span className="text-sm font-bold text-[rgb(var(--text-primary))]">
                            {employee.recommendationScore}%
                          </span>
                        </div>
                        <Badge type={
                          employee.workload.workloadLevel === 'Low' ? 'success' :
                          employee.workload.workloadLevel === 'Balanced' ? 'info' :
                          employee.workload.workloadLevel === 'High' ? 'warning' : 'danger'
                        } className="text-xs">
                          {employee.workload.workloadLevel}
                        </Badge>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-3 pt-3 border-t border-[rgb(var(--border))] grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-[rgb(var(--muted-foreground))]">On-time Rate</p>
                        <p className="text-sm font-semibold text-[rgb(var(--text-primary))]">
                          {employee.productivity.onTimeRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[rgb(var(--muted-foreground))]">Active Tasks</p>
                        <p className="text-sm font-semibold text-[rgb(var(--text-primary))]">
                          {employee.workload.activeTasks}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[rgb(var(--muted-foreground))]">Available</p>
                        <p className="text-sm font-semibold text-[rgb(var(--text-primary))]">
                          {employee.workload.availableHours}h
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View Snapshot Button */}
              {selectedEmployee && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowSnapshot(!showSnapshot)}
                    className="w-full"
                  >
                    {showSnapshot ? 'Hide' : 'View'} Employee Snapshot
                  </Button>
                </div>
              )}
            </>
          )}
        </Card>

        {/* Employee Snapshot */}
        {showSnapshot && selectedEmployee && (
          <div className="max-h-[400px] overflow-y-auto pr-1">
            <EmployeeSnapshot 
              employeeId={selectedEmployee}
              taskCategory={taskData.category}
              estimatedHours={taskData.estimatedHours}
            />
          </div>
        )}

        {/* Risk Assessment */}
        {riskAssessment && selectedEmployeeData && (
          <Card className={`p-5 ${getRiskColor(riskAssessment.level).bg}`}>
            <div className="flex items-start gap-3">
              <AlertTriangle 
                size={24} 
                className={`${getRiskColor(riskAssessment.level).text} flex-shrink-0`}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-[rgb(var(--text-primary))]">
                    Risk Assessment
                  </h4>
                  <Badge type={getRiskColor(riskAssessment.level).badge}>
                    {riskAssessment.level} Risk
                  </Badge>
                </div>
                {riskAssessment.factors.length > 0 && (
                  <ul className="text-sm text-[rgb(var(--text-secondary))] space-y-1">
                    {riskAssessment.factors.map((factor, idx) => (
                      <li key={idx}>• {factor}</li>
                    ))}
                  </ul>
                )}
                {riskAssessment.level === 'Low' && (
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    ✓ Low risk of delays. Employee is well-suited for this task.
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Task vs Employee Capacity */}
        {selectedEmployeeData && taskData.estimatedHours > 0 && (
          <Card className="p-5">
            <h4 className="font-semibold text-[rgb(var(--text-primary))] mb-3 flex items-center gap-2">
              <TrendingUp size={18} className="text-[rgb(var(--primary))]" />
              Capacity Analysis
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
                <p className="text-xs text-[rgb(var(--muted-foreground))] mb-1">
                  Task Effort
                </p>
                <p className="text-xl font-bold text-[rgb(var(--text-primary))]">
                  {taskData.estimatedHours}h
                </p>
              </div>
              <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
                <p className="text-xs text-[rgb(var(--muted-foreground))] mb-1">
                  Employee Capacity
                </p>
                <p className={`text-xl font-bold ${
                  selectedEmployeeData.workload.availableHours >= taskData.estimatedHours
                    ? 'text-[rgb(var(--success))]'
                    : 'text-[rgb(var(--error))]'
                }`}>
                  {selectedEmployeeData.workload.availableHours}h
                </p>
              </div>
            </div>
            {selectedEmployeeData.workload.availableHours < taskData.estimatedHours && (
              <div className="mt-3 p-2 bg-[rgb(var(--warning-bg))] border border-[rgb(var(--warning))] rounded text-sm text-[rgb(var(--text-secondary))]">
                ⚠️ Task effort exceeds employee's available hours this week
              </div>
            )}
          </Card>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleAssign}
            disabled={!taskData.title.trim() || !selectedEmployee || !taskData.dueDate}
            icon={CheckCircle}
          >
            Assign Task
          </Button>
        </div>
      </div>
    </Modal>
  );
};