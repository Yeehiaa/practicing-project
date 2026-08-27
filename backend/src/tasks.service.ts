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
}