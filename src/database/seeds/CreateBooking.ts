import { Connection } from 'typeorm'
import { Factory, Seed } from 'typeorm-seeding'

import { Booking } from '../../api/models/Booking'

export class CreateBooking implements Seed {
  public async seed (
    factory: Factory,
    connection: Connection
  ): Promise<Booking> {
    const em = connection.createEntityManager()

    const booking = new Booking()
    booking.hotelId = '840dr5ru-7ca4bda9157e4be990a6d360005baf8e'
    booking.userEmail = 'booking@gmail.com'

    return await em.save(booking)
  }
}
