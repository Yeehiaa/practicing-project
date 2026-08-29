import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.interface";
import { CreateTaskDto } from "./create-task.dto";
import { UpdateTaskDto } from "./update-task.dto";

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
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }
    
    // this method takes a task object as a parameter
    // and map to get the highest id in the current tasks and then add 1 to 
    // create the new task id 
    createTask(task: CreateTaskDto): Task {
        const tasksIds: number[] = this.tasks.map(task => task.id)
        const id = Math.max(0, ...tasksIds) + 1;
        const newTask = {id , ...task};
        this.tasks.push(newTask);
      return newTask;
    }

    // this method takes the specific task id which we want to update
    // and then searchs for it using the exisiting task finder by id 
    // and then searchs for the exisiting task index and then updates it with the new data 
    updateTask(id: number, task: UpdateTaskDto): Task {
    const updatedTask ={...this.getTaskById(id), ...task};
    const taskIndex = this.tasks.findIndex(exisitingTask => exisitingTask.id === id);
    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
    }

    deleteTask(id: number): void {
    this.getTaskById(id)
    this.tasks = this.tasks.filter(t => t.id !== id)
    }

    // or we can use : 

    // deleteTask(id: number) {
    // this.getTaskById(id)
    // const taskIndex = this.tasks.findIndex(exisitingTask => exisitingTask.id === id);
    // this.tasks.splice(taskIndex, 1)
    // return this.tasks;
    // } 
}