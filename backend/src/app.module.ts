import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TripsModule } from './trips/trips.module';
import { AuthModule } from './auth/auth.module';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [PrismaModule, TripsModule, AuthModule, ActivitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}