import {
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsLatLong
} from 'class-validator'

import { Get, JsonController, Param, QueryParams } from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'

import { Booking } from '../models/Booking'
import { BookingService } from '../services/BookingService'
import HereService from '../services/HereService'

import { Hotel } from '../services/HereService/types/Hotel'

export class BookingResponse {
  @IsEmail()
  @IsNotEmpty()
  public userEmail: string

  @IsNotEmpty()
  public hotelId: string

  @IsNotEmpty()
  public id: string
}

export class HotelResponse {
  @IsNotEmpty()
  public title: string

  @IsOptional()
  public vicinity: string

  @IsOptional()
  @IsArray()
  public position: Array<number>

  @IsOptional()
  @IsNotEmpty()
  public id: string

  @IsOptional()
  @IsNotEmpty()
  public distance: number
}

class SearchHotelsQuery {
  @IsLatLong()
  public at: string
}

@JsonController('/properties')
@OpenAPI({})
export class PropertyController {
  constructor (
    private bookingService: BookingService,
    private hereService: HereService
  ) {}

  @Get()
  @OpenAPI({ summary: 'Returns hotels in lat/long' })
  @ResponseSchema(HotelResponse, { isArray: true })
  public search (
    @QueryParams() params: SearchHotelsQuery
  ): Promise<Hotel[]> {
    return this.hereService.getHotels(params.at)
  }

  @Get('/:hotelId/bookings')
  @OpenAPI({ summary: 'Returns list of bookings for a hotel' })
  @ResponseSchema(BookingResponse, { isArray: true })
  public find (@Param('hotelId') hotelId: string): Promise<Booking[]> {
    return this.bookingService.findByHotelId(hotelId)
  }
}
