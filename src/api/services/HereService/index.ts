import { Service } from 'typedi'
import HttpClient from '../../../lib/httpClient'
import { Logger, LoggerInterface } from '../../../decorators/Logger'

import { Hotel, HereResponse } from './types/Hotel'
import { env } from '../../../env'
import { validateSync } from 'class-validator'

@Service()
export default class HereService extends HttpClient {
  constructor (@Logger(__filename) private log: LoggerInterface) {
    super(env.here.baseURL)
  }

  public getHotels = async (id: string): Promise<Hotel[]> => {
    this.log.info('Find all hotels around ', id)
    const res = await this.instance.get<HereResponse>(
      `/places/v1/autosuggest?at=${id}&q=hotel&apiKey=${env.here.apiKey}&category=hotel`
    )
    const heroResponse: HereResponse = res.data
    const hotels: Array<Hotel> = heroResponse.results.reduce(
      (result, hotel) => {
        const newHotel = new Hotel()
        newHotel.distance = hotel.distance
        newHotel.id = hotel.id
        newHotel.position = hotel.position
        newHotel.title = hotel.title
        newHotel.vicinity = hotel.vicinity
        if (validateSync(newHotel).length === 0) {
          result.push(newHotel)
        }

        return result
      },
      []
    )

    return hotels
  }
}
