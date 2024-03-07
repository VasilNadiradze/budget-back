import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export enum TransactionTypes {
    EXPENSE = 'expense',
    INCOME = 'income',
}

export class CreateTransactionDto {
    @ApiProperty({
        description: 'დასახელება',
        example: 'ხელფასი',
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'თანხა',
        example: 5000,
    })
    @IsNotEmpty()
    amount: number;

    @ApiProperty({
        description: 'ტიპი',
        example: 'income',
    })
    @IsNotEmpty()
    @IsEnum(TransactionTypes)
    type: TransactionTypes;

    @IsNotEmpty()
    category: Category;    
}
