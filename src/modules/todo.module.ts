import { Module } from "@nestjs/common";
import { TodoController } from "./todo/todo.controller";
import { TodoBusiness } from "./todo/todo.business";
import { TodoService } from "src/services/todo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./todo/entities/todo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Todo])],
    controllers: [TodoController],
    providers: [
        TodoBusiness,
        TodoService
    ],
})
export class TodoModule {}

