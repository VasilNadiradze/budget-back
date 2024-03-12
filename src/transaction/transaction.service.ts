import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CreateTransactionDto, 
  UpdateTransactionDto 
} from 'src/common/database/dto';
import { Category, Transaction } from 'src/common/database/entities';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Category) 
    private readonly categoryRepository: Repository<Category>,
  ){}

  async create(
    userId: number, 
    createTransactionDto: CreateTransactionDto
  ) {
    try{
      const category = await this.categoryRepository.findOne({ 
        where: { 
          id: +createTransactionDto.category,
          user: { id: userId }, 
        },
      });

      if(!category) 
        throw new NotFoundException('კატეგორია ვერ მოიძებნა');

      const newTransaction = await this.transactionRepository.save({
        title: createTransactionDto.title,
        amount: createTransactionDto.amount,
        type: createTransactionDto.type,
        user: { id: userId },
        category: { id: +createTransactionDto.category }
      });

      return newTransaction;
          
    }catch (err) {
      throw err; 
    }  
  }

  async findAll(userId: number) {
    try{
      const transactions = await this.transactionRepository.find({ 
        where: { 
          user: { id: userId }, 
        },
        relations: {
          category: true
        },
        order: {
          createdAt: 'DESC'
        }
      });

      return transactions;    
    }catch(err){
      throw err;
    }
  }

  async findOne(id: number) {
    try{
      const transaction = await this.transactionRepository.findOne({ 
        where: { 
          id: id
        },
        relations: {
          category: true
        }
      });

      if(!transaction) 
        throw new NotFoundException('ჩანაწერი ვერ მოიძებნა');
      
      return transaction;
    }catch(err){
      throw(err)
    }
  }

  async update(
    id: number, 
    updateTransactionDto: UpdateTransactionDto
  ) {
    try{
      const transaction = await this.findOne(id);

      if(!transaction) 
        throw new NotFoundException('ჩანაწერი ვერ მოიძებნა');

      transaction.title = updateTransactionDto.title;
      transaction.amount = updateTransactionDto.amount;
      transaction.category = updateTransactionDto.category;

      await this.transactionRepository.save(transaction);
      return transaction;
    }catch(err){
      throw(err)
    }   
  }

  async remove(id: number) {
    try{
      const transaction = await this.findOne(id);

      if(!transaction) 
        throw new NotFoundException('ჩანაწერი ვერ მოიძებნა');

      await this.transactionRepository.delete(id);
      return { 
        message: 'წაიშალა წარმატებით' 
      };
    }catch(err){
      throw(err)
    }   
  }  
}
