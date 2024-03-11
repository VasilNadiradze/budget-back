import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/common/database/entities';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionService], 
  exports: [TypeOrmModule.forFeature([Transaction])],
})
export class TransactionModule {}