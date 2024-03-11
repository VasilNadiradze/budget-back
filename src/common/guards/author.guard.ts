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
    // const request = context.switchToHttp().getRequest();
    // const userId = request.user.id; // Assuming you have the user information in the request

    // const route = request.route;
    // const method = request.method;
    // const pathSegments = route.path.split('/');
    // const entity = pathSegments[2]; 
    // const entityId = +request.params.id;

    // console.log(route.path);
    // console.log(pathSegments);
    // console.log(pathSegments.length);

    // let item;

    // switch (entity) {
    //   case 'category':
    //     item = await this.categoryRepository.findOne({ where: { id: entityId } });
    //     break;
    //   case 'transaction':
    //     item = await this.transactionRepository.findOne({ where: { id: entityId } });
    //     break;
    //   default:
    //     throw new NotFoundException('Entity not found');
    // }

    // if (!item) {
    //   throw new NotFoundException('Item not found');
    // }

    // // Check if the authenticated user is the author of the item
    // if (item.author.id !== userId) {
    //   throw new UnauthorizedException('You do not have permission');
    // }

    return true;
  }
}
