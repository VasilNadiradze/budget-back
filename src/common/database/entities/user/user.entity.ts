import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToMany
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Transaction } from '../transaction/transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column() 
  password: string;  

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Category, (category) => category.user, { onDelete: 'CASCADE' })
  categories: Category[]

  @OneToMany(() => Transaction, (transaction) => transaction.user, { onDelete: 'CASCADE' })
  transactions: Transaction[]
}