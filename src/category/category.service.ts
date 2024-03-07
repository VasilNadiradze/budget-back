import { 
  BadRequestException, 
  Injectable, 
  NotFoundException 
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) 
    private readonly categoryRepository: Repository<Category>
  ){}
  
  async create(
    userId: number, 
    createCategoryDto: CreateCategoryDto
  ) {
    try{
      const existed = await this.categoryRepository.findOne({ 
        where: { 
          user: { id: userId }, 
          title: createCategoryDto.title 
        },
      });

      if(existed) 
        throw new BadRequestException('ასეთი ჩანაწერი უკვე არსებობს');

      const newCategory = await this.categoryRepository.save({
        title: createCategoryDto.title,
        user: { id: userId },
      });

      return newCategory;
          
    }catch (err) {
      throw err; 
    }  
  }

  async findAll(userId: number) {
    try{
      const categories = await this.categoryRepository.find({ 
        where: { 
          user: { id: userId }, 
        },
        relations: {
          transactions: true
        }
      });

      return categories;    
    }catch(err){
      throw err;
    }
  }

  async findOne(
    userId: number, 
    id: number
  ) {
    try{
      const category = await this.categoryRepository.findOne({ 
        where: { 
          user: { id: userId }, 
          id: id
        },
        relations: {
          transactions: true
        }
      });

      if(!category) throw new NotFoundException('ჩანაწერი ვერ მოიძებნა');
      
      return category;
    }catch(err){
      throw(err)
    }
  }

  async update(
    userId: number, 
    id: number, 
    updateCategoryDto: UpdateCategoryDto
  ) {
    try{
      const category = await this.findOne(userId, id);
      if(!category) throw new NotFoundException('ჩანაწერი ვერ მოიძებნა');
      category.title = updateCategoryDto.title;
      await this.categoryRepository.save(category);
      return category;
    }catch(err){
      throw(err)
    }   
  }

  async remove(userId: number, id: number) {
    try{
      const category = await this.findOne(userId, id);
      if(!category) throw new NotFoundException('ჩანაწერი ვერ მოიძებნა');
      await this.categoryRepository.delete(id);
      return { 
        message: 'წაიშალა წარმატებით' 
      };
    }catch(err){
      throw(err)
    }   
  }  
}
