import * as nock from 'nock'
import request from 'supertest'

import { runSeed } from 'typeorm-seeding'

import { Booking } from '../../../src/api/models/Booking'
import { CreateBooking } from '../../../src/database/seeds/CreateBooking'
import { closeDatabase } from '../../utils/database'
import { BootstrapSettings } from '../utils/bootstrap'
import { prepareServer } from '../utils/server'

describe('/api', () => {
  let booking: Booking
  let settings: BootstrapSettings

  // -------------------------------------------------------------------------
  // Setup up
  // -------------------------------------------------------------------------

  beforeAll(async () => {
    settings = await prepareServer({ migrate: true })
    booking = await runSeed<Booking>(CreateBooking)
  })

  // -------------------------------------------------------------------------
  // Tear down
  // -------------------------------------------------------------------------

  afterAll(async () => {
    nock.cleanAll()
    await closeDatabase(settings.connection)
  })

  // -------------------------------------------------------------------------
  // Test cases
  // -------------------------------------------------------------------------

  test('POST: /api/bookings should create a new booking', async (done) => {
    await request(settings.app)
      .post('/api/bookings')
      .send({
        userEmail: 'bookings@gmail.com',
        hotelId: '840dr5ru-26a6b3d3c37641f4a3cb5ce0c75fa11f'
      })
      .expect('Content-Type', /json/)
      .expect(200)

    done()
  })

  test("POST: /api/bookings shouldn't create a new booking due to invalid hotel id", async (done) => {
    await request(settings.app)
      .post('/api/bookings')
      .send({
        userEmail: 'bookings@gmail.com',
        hotelId: '840dr5ru-26a6b3d3c37641f4a3cb5ce0c75fa11'
      })
      .expect('Content-Type', /json/)
      .expect(400)

    done()
  })

  test("POST: /api/bookings shouldn't create a new booking due to invalid email id", async (done) => {
    await request(settings.app)
      .post('/api/bookings')
      .send({
        userEmail: 'bookings',
        hotelId: '840dr5ru-26a6b3d3c37641f4a3cb5ce0c75fa11f'
      })
      .expect('Content-Type', /json/)
      .expect(400)

    done()
  })

  test('GET: /api/properties/:hotelId/bookings should return booking', async (done) => {
    const response = await request(settings.app)
      .get(`/api/properties/${booking.hotelId}/bookings`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body[0].hotelId).toBe(booking.hotelId)
    expect(response.body[0].userEmail).toBe(booking.userEmail)
    done()
  })
})
