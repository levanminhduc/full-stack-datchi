import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { MetaController } from './meta.controller';
import { MetaService } from './meta.service';

@Module({
  imports: [SupabaseModule],
  controllers: [MetaController],
  providers: [MetaService],
})
export class MetaModule {}

