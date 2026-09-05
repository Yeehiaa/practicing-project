import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
@Module({
  imports: [TasksModule, ConfigModule.forRoot({ isGlobal: true }), SupabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
