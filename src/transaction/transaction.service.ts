import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>
  ){}

  async create(
    userId: number, 
    createTransactionDto: CreateTransactionDto
  ) {
    try{
      const newTransaction = await this.transactionRepository.save({
        title: createTransactionDto.title,
        amount: createTransactionDto.amount,
        type: createTransactionDto.type,
        user: { id: userId },
        transaction: { id: +createTransactionDto.category }
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

  async findOne(
    userId: number, 
    id: number
  ) {
    try{
      const transaction = await this.transactionRepository.findOne({ 
        where: { 
          user: { id: userId }, 
          id: id
        },
        relations: {
          category: true
        }
      });

      if(!transaction) throw new NotFoundException('ჩანაწერი ვერ მოიძებნა');
      
      return transaction;
    }catch(err){
      throw(err)
    }
  }

  async update(
    userId: number, 
    id: number, 
    updateTransactionDto: UpdateTransactionDto
  ) {
    try{
      const transaction = await this.findOne(userId, id);
      if(!transaction) throw new NotFoundException('ჩანაწერი ვერ მოიძებნა');
      transaction.title = updateTransactionDto.title;
      transaction.amount = updateTransactionDto.amount;
      transaction.category = updateTransactionDto.category;
      await this.transactionRepository.save(transaction);
      return transaction;
    }catch(err){
      throw(err)
    }   
  }

  async remove(userId: number, id: number) {
    try{
      const transaction = await this.findOne(userId, id);
      if(!transaction) throw new NotFoundException('ჩანაწერი ვერ მოიძებნა');
      await this.transactionRepository.delete(id);
      return { 
        message: 'წაიშალა წარმატებით' 
      };
    }catch(err){
      throw(err)
    }   
  }  
}
