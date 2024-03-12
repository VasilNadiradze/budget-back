import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { Category } from "../category/category.entity";
import { User } from "../user/user.entity";

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    type: string;

    @Column()
    amount: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;  
    
    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Category, (category) => category.transactions)
    @JoinColumn({ name: 'category_id' })
    category: Category;
}
