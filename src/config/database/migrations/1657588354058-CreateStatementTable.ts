import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStatementTable1657588354058 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'statement',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'installment',
            type: 'int4',
          },
          {
            name: 'finishDate',
            type: 'date',
          },
          {
            name: 'amount',
            type: 'numeric',
          },
          {
            name: 'startDate',
            type: 'date',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('statement');
  }
}
