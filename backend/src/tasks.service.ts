import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.interface";

@Injectable()
export class TasksService {
    private tasks: Task[] = [
        { id: 1, title: "Task 1", description: "Task 1 description" },
        { id: 2, title: "Task 2", description: "Task 2 description" },
        { id: 3, title: "Task 3", description: "Task 3 description" },
    ]

    getTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: number): Task  {
        // Here i used find to get the task which have the id with the same id as the one passed in the parameter
        const task = this.tasks.find(task => task.id === id);
        console.log("tasks", typeof this.tasks);
        console.log("task", typeof task);
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }
    
    // this method takes a task object as a parameter
    // and map to get the highest id in the current tasks and then add 1 to 
    // create the new task id 
    createTask(task: Omit<Task, 'id'>): Task {
        const tasksIds: number[] = this.tasks.map(task => task.id)
        const id = Math.max(...tasksIds) + 1;
        const newTask = {id , ...task};
        this.tasks.push(newTask);
      return newTask;
    }

}