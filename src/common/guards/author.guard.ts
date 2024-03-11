import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  NotFoundException, 
  UnauthorizedException 
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Transaction } from '../database/entities';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id; // Assuming you have the user information in the request

    const route = request.route;
    const pathSegments = route.path.split('/');
    const entity = pathSegments[2]; // Assuming the entity is always at the third position in the path
    const entityId = +request.params.id;

    console.log(entityId);

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
