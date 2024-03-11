import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category, Transaction } from 'src/common/database/entities';
import { TransactionService } from 'src/transaction/transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Transaction])], 
  controllers: [CategoryController],
  providers: [CategoryService, TransactionService]  
})
export class CategoryModule {}