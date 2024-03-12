import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  NotFoundException, 
  UnauthorizedException 
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Transaction } from '../database/entities';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    @InjectRepository(Category) 
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Transaction) 
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const entityId = +request.params.id;

    if(entityId){
      let item;
      const userId = request.user.id; 
      const route = request.route;
      const pathSegments = route.path.split('/');
      const entity = pathSegments[2];
      switch (entity) {
        case 'category':
          item = await this.categoryRepository.findOne({ 
            where: { id: entityId } ,
            relations: { user: true }
          });
          break;
        case 'transaction':
          item = await this.transactionRepository.findOne({ 
            where: { id: entityId } ,
            relations: { user: true }
          });
          break;
        default:
          throw new NotFoundException('ჩანაწერი ვერ მოიძებნა');
      }

      if (!item) {
        throw new NotFoundException('ჩანაწერი ვერ მოიძებნა');
      }

      if (item.user.id !== userId) {
        throw new UnauthorizedException('თქვენ არ გაქვთ ამ ოპერაციის შესრულების უფლება');
      }
    }

    return true;
  }
}
