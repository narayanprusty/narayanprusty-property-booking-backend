import * as nock from 'nock'
import request from 'supertest'
import moxios from 'moxios'

import { BootstrapSettings } from '../utils/bootstrap'
import { prepareServer } from '../utils/server'

describe('/api', () => {
  let settings: BootstrapSettings

  // -------------------------------------------------------------------------
  // Setup up
  // -------------------------------------------------------------------------
  beforeAll(async () => {
    settings = await prepareServer()
  })

  beforeEach(function () {
    moxios.install()
  })

  // -------------------------------------------------------------------------
  // Tear down
  // -------------------------------------------------------------------------

  afterAll(async () => {
    nock.cleanAll()
  })

  afterEach(function () {
    moxios.uninstall()
  })

  // -------------------------------------------------------------------------
  // Test cases
  // -------------------------------------------------------------------------

  test('GET: /api/properties should return hotels', async (done) => {
    const hotel = {
      title: 'Hotel Pennsylvania',
      highlightedTitle: '<b>Hotel</b> Pennsylvania',
      vicinity: '401 7th Ave<br/>New York, NY 10001',
      highlightedVicinity: '401 7th Ave<br/>New York, NY 10001',
      position: [40.75013, -73.99098],
      category: 'hotel',
      categoryTitle: 'Hotel',
      href:
        'https://places.ls.hereapi.com/places/v1/places/840dr5ru-26a6b3d3c37641f4a3cb5ce0c75fa11f;context=Zmxvdy1pZD1kYmRhZTQzYS0xMWRiLTU1YzAtYTY4ZC04YjYyMzlhMGMwOGRfMTYwMTgzNDY1MDUxMV8yOTE0XzE1OTUmcmFuaz0y?app_id=Wphy5RC1U3atZC3VkLsU&app_code=-7flp47OXkZQq_E6WGkbCg',
      type: 'urn:nlp-types:place',
      resultType: 'place',
      id: '840dr5ru-26a6b3d3c37641f4a3cb5ce0c75fa11f',
      distance: 492
    }

    moxios.wait(async () => {
      const request = moxios.requests.mostRecent()
      await request.respondWith({
        status: 200,
        response: {
          results: [hotel]
        }
      })
    })

    const response = await request(settings.app)
      .get('/api/properties?at=40.74511,-73.98862')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body[0].title).toBe(hotel.title)
    expect(response.body[0].vicinity).toBe(hotel.vicinity)
    expect(response.body[0].position[0]).toBe(hotel.position[0])
    expect(response.body[0].position[1]).toBe(hotel.position[1])
    expect(response.body[0].distance).toBe(hotel.distance)
    done()
  })

  test("GET: /api/properties shouldn't return hotels", async (done) => {
    await request(settings.app)
      .get('/api/properties?at=40.74511')
      .expect('Content-Type', /json/)
      .expect(400)

    done()
  })
})
