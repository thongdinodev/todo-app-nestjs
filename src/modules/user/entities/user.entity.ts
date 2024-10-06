import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Todo } from "src/modules/todo/entities/todo.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: 'username', unique: true })
    username: string;

    @Column({ name: 'password' })
    password: string;

    @OneToMany(() => Todo, (todo: Todo) => todo.owner)
    public todos?: Todo[];
}