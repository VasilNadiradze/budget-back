import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Transaction } from 'src/common/database/entities';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Category])],
  controllers: [TransactionController],
  providers: [TransactionService, CategoryService],
})

export class TransactionModule {}

