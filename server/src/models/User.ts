import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import Orphanage from './Orphanage';

@Entity('users')
export default class User {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @OneToMany(() => Orphanage, orphanage => orphanage.user_id, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'user_id' })
    orphanages: Orphanage[];
}