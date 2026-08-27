// a controller handles the incoming requests from the frontend or any other source and sends back a response to the client,
//it got all the routes needed e.g.: @Get() which calls a method from the service which handles getting the tasks from the database or any other logic
// the same for post, put, delete, etc. requests
// this "tasks.controller.ts" handles any requests related to tasks from getting the tasks to creating, updating, and deleting them


import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import type { Task } from "./task.interface";


@Controller("tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    getTasks(): Task[] {
        return this.tasksService.getTasks();
    }

    @Get(":id")
    getTaskById( @Param("id", ParseIntPipe) id: number): Task {
        return this.tasksService.getTaskById(id);
    }
}