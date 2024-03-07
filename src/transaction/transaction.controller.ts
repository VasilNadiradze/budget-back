import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthtUser } from 'src/common/decorators/auth.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('transaction')
@UseGuards(AuthGuard('jwt'))
@ApiTags('ტრანზაქციები')
@ApiBearerAuth()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({
    summary: 'ტრანზაქციის შექმნა',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'შეიქმნა წარმატებით',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'არასწორი პარამეტრები',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'სერვერული ხარვეზი',
  })
  @Post()
  async create(
    @AuthtUser() user: User, 
    @Body() createTransactionDto: CreateTransactionDto
  ) {
    return await this.transactionService.create(user.id, createTransactionDto);
  }

  @ApiOperation({
    summary: 'ტრანზაქციების სია',
  })
  @ApiResponse({
    status: 200,
    description: 'ჩაიტვირტა წარმატებით',
    type: [CreateTransactionDto],
  })
  @ApiResponse({
    status: 400,
    description: 'არასწორი პარამეტრები',
  })
  @ApiResponse({
    status: 500,
    description: 'სერვერული ხარვეზი',
  })
  @Get()
  async findAll(@AuthtUser() user: User) {
    return await this.transactionService.findAll(user.id);
  }

  @ApiOperation({
    summary: 'ტრანზაქციის დეტალები',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'კონკრეტული ჩანაწერი',
    type: CreateTransactionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'არასწორი პარამეტრები',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'სერვერული ხარვეზი',
  })
  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ტრანზაქციის ID',
  })
  @Get(':id')
  async findOne(
    @AuthtUser() user: User, 
    @Param('id') id: number
  ) {
    return await this.transactionService.findOne(user.id, +id);
  }

  @ApiOperation({
    summary: 'ტრანზაქციის განახლება',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'განახლდა წარმატებით',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'არასწორი პარამეტრები',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'სერვერული ხარვეზი',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ტრანზაქციის ID',
  })
  @Patch(':id')
  async update(
    @AuthtUser() user: User,
    @Param('id') id: string, 
    @Body() updateCategoryDto: UpdateTransactionDto
  ) {
    return await this.transactionService.update(user.id, +id, updateCategoryDto);
  }

  @ApiOperation({
    summary: 'ტრანზაქციის წაშლა',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'წაიშალა წარმატებით',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'არასწორი პარამეტრები',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'სერვერული ხარვეზი',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ტრანზაქციის ID',
  })
  @Delete(':id')
  async remove(
    @AuthtUser() user: User, 
    @Param('id') id: string
  ) {
    return await this.transactionService.remove(user.id, +id);
  }
}
