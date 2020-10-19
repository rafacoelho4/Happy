import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export default class User {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    senha: string;
}