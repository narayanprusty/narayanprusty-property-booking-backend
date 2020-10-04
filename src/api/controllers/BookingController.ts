import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

import { JsonController, Post, Body } from 'routing-controllers'
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi'

import { Booking } from '../models/Booking'
import { BookingService } from '../services/BookingService'

export class BookingResponse {
  @IsEmail()
  @IsNotEmpty()
  public userEmail: string

  @IsNotEmpty()
  public hotelId: string

  @IsNotEmpty()
  public id: string
}

class CreateBookingBody {
  @MinLength(41)
  @MaxLength(41)
  @IsNotEmpty()
  public hotelId: string

  @IsEmail()
  @IsNotEmpty()
  public userEmail: string
}

@JsonController('/bookings')
@OpenAPI({})
export class PropertyController {
  constructor (private bookingService: BookingService) {}

  @Post()
  @OpenAPI({ summary: 'Creates a new hotel booking' })
  @ResponseSchema(BookingResponse)
  public create (@Body() body: CreateBookingBody): Promise<Booking> {
    const booking = new Booking()
    booking.userEmail = body.userEmail
    booking.hotelId = body.hotelId

    return this.bookingService.create(booking)
  }
}
