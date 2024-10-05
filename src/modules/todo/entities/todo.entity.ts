import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TodoEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id?: number;

    @Column({ name: 'title'})
    title: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'completed'})
    completed: boolean;

    @Column({ name: 'deadline' })
    deadline: Date;
}