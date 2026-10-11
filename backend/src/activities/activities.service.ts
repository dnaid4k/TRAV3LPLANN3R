import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    tripId: string,
    userId: string,
    createActivityDto: CreateActivityDto,
  ) {
    const trip = await this.prisma.trip.findFirst({
      where: {
        id: tripId,
        userId,
      },
    });

    if (!trip) {
      return null;
    }

    const date = new Date(createActivityDto.date);

    if (date < trip.startDate || date > trip.endDate) {
      throw new BadRequestException(
        'Activity date must be within the trip dates',
      );
    }

    return this.prisma.activity.create({
      data: {
        tripId,
        date,
        time: createActivityDto.time,
        title: createActivityDto.title,
      },
    });
  }

  async update(
    id: string,
    userId: string,
    updateActivityDto: UpdateActivityDto,
  ) {
    const activity = await this.prisma.activity.findFirst({
      where: {
        id,
        trip: {
          userId,
        },
      },
    });

    if (!activity) {
      return null;
    }

    const trip = await this.prisma.trip.findUnique({
      where: {
        id: activity.tripId,
      },
    });

    if (!trip) {
      return null;
    }

    const date =
      updateActivityDto.date !== undefined
        ? new Date(updateActivityDto.date)
        : activity.date;

    if (date < trip.startDate || date > trip.endDate) {
      throw new BadRequestException(
        'Activity date must be within the trip dates',
      );
    }

    return this.prisma.activity.update({
      where: {
        id,
      },
      data: {
        ...(updateActivityDto.date !== undefined && {
          date,
        }),

        ...(updateActivityDto.time !== undefined && {
          time: updateActivityDto.time,
        }),

        ...(updateActivityDto.title !== undefined && {
          title: updateActivityDto.title,
        }),
      },
    });
  }

  async remove(id: string, userId: string) {
    const activity = await this.prisma.activity.findFirst({
      where: {
        id,
        trip: {
          userId,
        },
      },
    });

    if (!activity) {
      return null;
    }

    return this.prisma.activity.delete({
      where: {
        id,
      },
    });
  }
}