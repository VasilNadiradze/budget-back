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
import { AuthGuard } from '@nestjs/passport';
import { AuthtUser } from 'src/common/decorators/auth.decorator';
import { 
  ApiBearerAuth, 
  ApiOperation, 
  ApiParam, 
  ApiResponse, 
  ApiTags
} from '@nestjs/swagger';
import { 
  CreateCategoryDto, 
  UpdateCategoryDto 
} from 'src/common/database/dto';
import { User } from 'src/common/database/entities';
import { AuthorGuard } from 'src/common/guards';

@Controller('category')
@UseGuards(AuthorGuard)
@UseGuards(AuthGuard('jwt'))
@ApiTags('კატეგორიები')
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

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
    description: 'კატეგორიის ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.categoryService.findOne(+id);
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
    description: 'კატეგორიის ID',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return await this.categoryService.update(+id, updateCategoryDto);
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
    description: 'კატეგორიის ID',
  })
  @Delete(':id')
  async remove(@Param('id') id: string
  ) {
    return await this.categoryService.remove(+id);
  }
}
