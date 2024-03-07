import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateCategoryDto {
    @ApiProperty({
        description: 'დასახელება',
        example: 'საოჯახო საყიდლები',
    })
    @IsNotEmpty()
    title: string;   
}
