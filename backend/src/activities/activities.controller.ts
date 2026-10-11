import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CreateActivityDto } from './dto/create-activity.dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto/update-activity.dto';
import { ActivitiesService } from './activities.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post('trips/:tripId/activities')
  create(
    @Param('tripId') tripId: string,
    @Request() request: any,
    @Body() createActivityDto: CreateActivityDto,
  ) {
    return this.activitiesService.create(
      tripId,
      request.user.sub,
      createActivityDto,
    );
  }

  @Patch('activities/:id')
  update(
    @Param('id') id: string,
    @Request() request: any,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activitiesService.update(
      id,
      request.user.sub,
      updateActivityDto,
    );
  }

  @Delete('activities/:id')
  remove(@Param('id') id: string, @Request() request: any) {
    return this.activitiesService.remove(id, request.user.sub);
  }
}