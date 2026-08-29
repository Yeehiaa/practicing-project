export interface Task {
    id: number;
    title: string;
    description: string;
}

// Omit<Task, 'id'> is used to make sure the body is : {title: string, description: string}
// Partial<Omit<Task, 'id'>> is used to make sure the body is : {title?: string, description?: string}

export type TaskWithoutId = Omit<Task, 'id'>

export type PartialTask = Partial<TaskWithoutId>