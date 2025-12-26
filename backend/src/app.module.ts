import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MetaModule } from './meta/meta.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MetaModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
