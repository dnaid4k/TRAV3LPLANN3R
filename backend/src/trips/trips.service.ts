import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.trip.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(
    userId: string,
    createTripDto: CreateTripDto,
  ) {
    const startDate = new Date(createTripDto.startDate);
    const endDate = new Date(createTripDto.endDate);

    if (endDate < startDate) {
      throw new BadRequestException(
        'End date cannot be before start date',
      );
    }

    return this.prisma.trip.create({
      data: {
        userId,
        name: createTripDto.name,
        destination: createTripDto.destination,
        startDate,
        endDate,
      },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.trip.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        activities: {
          orderBy: [
            {
              date: 'asc',
            },
            {
              time: 'asc',
            },
          ],
        },
      },
    });
  }

  async update(
    id: string,
    userId: string,
    updateTripDto: UpdateTripDto,
  ) {
    const trip = await this.prisma.trip.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!trip) {
      return null;
    }

    const startDate =
      updateTripDto.startDate !== undefined
        ? new Date(updateTripDto.startDate)
        : trip.startDate;

    const endDate =
      updateTripDto.endDate !== undefined
        ? new Date(updateTripDto.endDate)
        : trip.endDate;

    if (endDate < startDate) {
      throw new BadRequestException(
        'End date cannot be before start date',
      );
    }

    return this.prisma.trip.update({
      where: {
        id,
      },
      data: {
        ...(updateTripDto.name !== undefined && {
          name: updateTripDto.name,
        }),

        ...(updateTripDto.destination !== undefined && {
          destination: updateTripDto.destination,
        }),

        ...(updateTripDto.startDate !== undefined && {
          startDate,
        }),

        ...(updateTripDto.endDate !== undefined && {
          endDate,
        }),
      },
    });
  }

  async remove(id: string, userId: string) {
    const trip = await this.prisma.trip.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!trip) {
      return null;
    }

    return this.prisma.trip.delete({
      where: {
        id,
      },
    });
  }
}