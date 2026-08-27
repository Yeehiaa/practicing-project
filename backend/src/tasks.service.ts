import { Injectable } from "@nestjs/common";
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
}