import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_CLIENT = 'SUPABASE_CLIENT';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: SUPABASE_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService): SupabaseClient => {
        const url =
          config.get<string>('SUPABASE_URL') ??
          config.get<string>('NEXT_PUBLIC_SUPABASE_URL');
        const key =
          config.get<string>('SUPABASE_SERVICE_ROLE_KEY') ??
          config.get<string>('SUPABASE_ANON_KEY') ??
          config.get<string>('NEXT_PUBLIC_SUPABASE_ANON_KEY');
        if (!url || !key) {
          throw new Error(
            'Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY',
          );
        }
        return createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
      },
    },
  ],
  exports: [SUPABASE_CLIENT],
})
export class SupabaseModule {}
