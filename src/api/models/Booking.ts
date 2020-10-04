import { IsNotEmpty, IsOptional } from 'class-validator'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Booking {
  @IsOptional()
  @PrimaryColumn()
  public id: number

  @IsNotEmpty()
  @Column()
  public hotelId: string

  @IsNotEmpty()
  @Column()
  public userEmail: string
}
