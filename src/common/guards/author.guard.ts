import { 
    Injectable, 
    CanActivate, 
    ExecutionContext 
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const route = request.route;

    console.log('Route:', route);
    console.log('Method:', request.method);
    console.log('Path:', request.path);

    // Your logic for checking the entity and action can go here

    return true; // or false based on your conditions
  }
}
