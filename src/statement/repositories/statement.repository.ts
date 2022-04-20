import { EntityRepository, Repository } from 'typeorm';

import { Statement } from '../entities/statement.entity';

@EntityRepository(Statement)
class StatementRepository extends Repository<Statement> {}

export { StatementRepository };
