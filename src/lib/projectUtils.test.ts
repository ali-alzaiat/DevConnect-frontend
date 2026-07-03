import { describe, it, expect } from 'vitest';
import { groupTasks } from './projectUtils';
import { Task } from '@/components/projects/ProjectDetails/types';

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'T1',
    status: 'to-do',
    dueDate: '2024-01-01',
    assignee: { id: 1, name: 'A' },
    type: 'FEATURE' as Task['type'],
    priority: 'HIGH' as Task['priority'],
    order: 0
  },
  {
    id: 2,
    title: 'T2',
    status: 'in-progress',
    dueDate: '2024-01-01',
    assignee: { id: 1, name: 'A' },
    type: 'BUG' as Task['type'],
    priority: 'MEDIUM' as Task['priority'],
    order: 0
  },
  {
    id: 3,
    title: 'T3',
    status: 'done',
    dueDate: '2024-01-01',
    assignee: { id: 1, name: 'A' },
    type: 'DOCS' as Task['type'],
    priority: 'LOW' as Task['priority'],
    order: 0
  }
];

describe('groupTasks', () => {
  it('correctly groups tasks by status', () => {
    const grouped = groupTasks(mockTasks);
    expect(grouped['to-do']).toHaveLength(1);
    expect(grouped['in-progress']).toHaveLength(1);
    expect(grouped['done']).toHaveLength(1);
    expect(grouped['to-do'][0].id).toBe(1);
  });

  it('returns empty arrays for categories with no tasks', () => {
    const grouped = groupTasks([]);
    expect(grouped['to-do']).toEqual([]);
    expect(grouped['in-progress']).toEqual([]);
    expect(grouped['done']).toEqual([]);
  });
});
