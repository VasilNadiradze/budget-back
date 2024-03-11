import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TransactionModule } from '../transaction/transaction.module'; 
import { Category } from 'src/common/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), TransactionModule], 
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}