import { 
  BadRequestException, 
  Injectable, 
  NotFoundException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  CreateCategoryDto, 
  UpdateCategoryDto 
} from 'src/common/database/dto';
import { Category } from 'src/common/database/entities';

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

  async findOne(id: number) {
    try{
      const category = await this.categoryRepository.findOne({ 
        where: { 
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

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try{
      const category = await this.findOne(id);
      if(!category) 
        throw new NotFoundException('ჩანაწერი ვერ მოიძებნა');
      category.title = updateCategoryDto.title;
      await this.categoryRepository.save(category);
      return category;
    }catch(err){
      throw(err)
    }   
  }

  async remove(id: number) {
    try{
      const category = await this.findOne(id);
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
