import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UsersModule, CategoriesModule, ExpensesModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
