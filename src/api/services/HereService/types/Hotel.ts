import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator'
import { Entity } from 'typeorm'
import { Type } from 'class-transformer'

@Entity()
export class Hotel {
  @IsNotEmpty()
  public title: string

  @IsNotEmpty()
  public vicinity: string

  @IsArray()
  public position: Array<number>

  @IsNotEmpty()
  public id: string

  @IsNotEmpty()
  public distance: number
}

@Entity()
export class HereResponse {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Hotel)
  public results: Array<Hotel>
}
