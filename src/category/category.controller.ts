import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthtUser } from 'src/common/decorators/auth.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('category')
@UseGuards(AuthGuard('jwt'))
@ApiTags('კატეგორიები')
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'კატეგორიების სია',
  })
  @ApiResponse({
    status: 200,
    description: 'ჩაიტვირტა წარმატებით',
    type: [CreateCategoryDto],
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
    return await this.categoryService.findAll(user.id);
  }

  @ApiOperation({
    summary: 'კატეგორიის შექმნა',
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
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    return await this.categoryService.create(user.id, createCategoryDto);
  }

  @ApiOperation({
    summary: 'კატეგორიის დეტალები',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'კონკრეტული ჩანაწერი',
    type: CreateCategoryDto,
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
    description: 'UUID of setting definition',
  })
  @Get(':id')
  async findOne(
    @AuthtUser() user: User, 
    @Param('id') id: number
  ) {
    return await this.categoryService.findOne(user.id, +id);
  }

  @ApiOperation({
    summary: 'კატეგორიის განახლება',
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
    description: 'ჩანაწერის ID',
  })
  @Patch(':id')
  async update(
    @AuthtUser() user: User,
    @Param('id') id: string, 
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return await this.categoryService.update(user.id, +id, updateCategoryDto);
  }

  @ApiOperation({
    summary: 'კატეგორიის წაშლა',
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
    description: 'ჩანაწერის ID',
  })
  @Delete(':id')
  async remove(
    @AuthtUser() user: User, 
    @Param('id') id: string
  ) {
    return await this.categoryService.remove(user.id, +id);
  }
}
