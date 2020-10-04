import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateBookingTable1601752910248 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: 'booking',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isNullable: true,
          generationStrategy: 'increment',
          isGenerated: true
        },
        {
          name: 'hotelId',
          type: 'varchar',
          length: '41',
          isNullable: false
        },
        {
          name: 'userEmail',
          type: 'varchar',
          length: '254',
          isPrimary: false,
          isNullable: false
        }
      ]
    })
    await queryRunner.createTable(table)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('booking')
  }
}
