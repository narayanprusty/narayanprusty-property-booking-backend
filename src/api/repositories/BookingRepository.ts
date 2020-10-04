import { EntityRepository, Repository } from 'typeorm'

import { Booking } from '../models/Booking'

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {}
