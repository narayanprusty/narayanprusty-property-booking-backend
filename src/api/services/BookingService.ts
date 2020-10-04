import { Service } from 'typedi'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { Logger, LoggerInterface } from '../../decorators/Logger'
import { Booking } from '../models/Booking'
import { BookingRepository } from '../repositories/BookingRepository'

@Service()
export class BookingService {
  constructor (
    @OrmRepository() private bookingRepository: BookingRepository,
    @Logger(__filename) private log: LoggerInterface
  ) {}

  public findByHotelId (hotelId: string): Promise<Booking[]> {
    this.log.info('Find all booking for property', hotelId)
    return this.bookingRepository.find({
      where: {
        hotelId
      }
    })
  }

  public async create (booking: Booking): Promise<Booking> {
    this.log.info('Create a new booking => ', JSON.stringify(booking))
    const newBooking: Booking = await this.bookingRepository.save(booking)
    return newBooking
  }
}
