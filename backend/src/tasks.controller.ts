// a controller handles the incoming requests from the frontend or any other source and sends back a response to the client,
//it got all the routes needed e.g.: @Get() which calls a method from the service which handles getting the tasks from the database or any other logic
// the same for post, put, delete, etc. requests
// this "tasks.controller.ts" handles any requests related to tasks from getting the tasks to creating, updating, and deleting them


import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import type { Task } from "./task.interface";


@Controller("tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    getTasks(): Task[] {
        return this.tasksService.getTasks();
    }

    // this @Param decorator is used to get the extra thing after
    // tasks/---- which is the id and put it in the parameter of the method
    // which is a typescript thing
    @Get(":id")
    getTaskById(@Param("id", ParseIntPipe) id: number): Task {
        return this.tasksService.getTaskById(id);
    }
     
    // this @Body decorator is used to get the body of the Post request
    // and use it as the parameter of the method which is a typescript thing
    @Post()
    createTask(@Body() task: Omit<Task, 'id'>): Task {
        return this.tasksService.createTask(task);
    }

    // this @Patch is used to update an exisiting task
    // it knows the specific task by the id given in it
    // and updates the @Body data in it
    // Omit<Task, 'id'> is used to make sure the body is : {title: string, description: string}
    // Partial<Omit<Task, 'id'>> is used to make sure the body is : {title?: string, description?: string}
    @Patch(":id")
    updateTask(@Param("id", ParseIntPipe) id: number, @Body() task: Partial<Omit<Task, 'id'>>): Task {
        return this.tasksService.updateTask(id, task);
    }
}