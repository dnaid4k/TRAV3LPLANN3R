import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CreateTripDto } from './dto/create-trip.dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto/update-trip.dto';
import { TripsService } from './trips.service';

@Controller('trips')
@UseGuards(JwtAuthGuard)
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  findAll(@Request() request: any) {
    return this.tripsService.findAll(request.user.sub);
  }

  @Post()
  create(@Request() request: any, @Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(request.user.sub, createTripDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string, @Request() request: any) {
    return this.tripsService.findOne(id, request.user.sub);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() request: any,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripsService.update(
      id,
      request.user.sub,
      updateTripDto,
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string, @Request() request: any) {
    return this.tripsService.remove(id, request.user.sub);
  }
}