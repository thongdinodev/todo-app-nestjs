import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: 'username', unique: true })
    username: string;

    @Column({ name: 'password' })
    password: string;

}