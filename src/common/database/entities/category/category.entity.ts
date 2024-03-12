import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne,
    JoinColumn,
    OneToMany
  } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { User } from '../user/user.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;   
    
    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions: Transaction[]
}
