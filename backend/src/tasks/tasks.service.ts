import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Task } from "./task.interface";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { SupabaseService } from "src/supabase/supabase.service";


@Injectable()
export class TasksService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async getTasks(): Promise<Task[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('tasks')
            .select('*');

        if (error) {
            throw new InternalServerErrorException(error.message);
        }

        return data;
    }

    async getTaskById(id: number): Promise<Task> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('tasks')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }

        return data;
    }

    async createTask(task: CreateTaskDto) {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('tasks')
            .insert(task)
            .select('*')
            .single();

        if (error) {
            throw new InternalServerErrorException(error.message);
        }
        return data;
    }

    async updateTask(id: number, task: UpdateTaskDto) {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('tasks')
            .update(task)
            .eq('id', id)
            .select('*')
            .single();

        if (error) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return data;
    }

    async deleteTask(id: number) {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('tasks')
            .delete()
            .eq('id', id)
            .select('*')
            .single();

        if (error) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
    }

}