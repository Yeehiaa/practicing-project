import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
    private readonly client: SupabaseClient

    constructor(private readonly configService: ConfigService) {
        this.client = createClient(
            this.configService.getOrThrow<string>('SUPABASE_URL'),
            this.configService.getOrThrow<string>('SUPABASE_KEY'),
        )
    }

    /**
 * Returns the shared Supabase client instance.
 * @returns The configured SupabaseClient used for all database operations.
 */
    getClient(): SupabaseClient {
        return this.client;
    }
}