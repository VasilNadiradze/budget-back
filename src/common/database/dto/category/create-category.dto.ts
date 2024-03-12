import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        description: 'დასახელება',
        example: 'საოჯახო საყიდლები',
    })
    @IsNotEmpty()
    title: string;   
}
