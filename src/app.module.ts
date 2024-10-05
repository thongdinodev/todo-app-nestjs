import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TodoModule } from './modules/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'test1234',
      database: 'todo_assignment_nestjs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TodoModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

