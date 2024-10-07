import { Module } from "@nestjs/common";
import { TodoController } from "./todo/todo.controller";
import { TodoBusiness } from "./todo/todo.business";
import { TodoService } from "src/services/todo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./todo/entities/todo.entity";
import { InterfaceTodoRepository } from "src/repositories/interface.todo";
import { TodoRepository } from "src/repositories/todo.repository";
import { UserModule } from "./user.module";

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([Todo])
    ],
    controllers: [TodoController],
    providers: [
        TodoBusiness,
        TodoService,
        { provide: 'InterfaceTodoRepository', useClass: TodoRepository}
    ],
})
export class TodoModule {}

