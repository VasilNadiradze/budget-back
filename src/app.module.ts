import { Module, ValidationPipe } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CategoryModule, 
    AuthModule, 
    TransactionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({     
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        synchronize: configService.get<boolean>('POSTGRES_SYNCHRONIZE'),
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor, // respons-ების სტანდარტიზაცია
    },
  ]
})
export class AppModule {}