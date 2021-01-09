import {MigrationInterface, QueryRunner} from "typeorm";

export class BoardDeletion1610199952285 implements MigrationInterface {
    name = 'BoardDeletion1610199952285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_list" DROP CONSTRAINT "FK_e636800325a5ce8c7524ce1dec5"`);
        await queryRunner.query(`ALTER TABLE "task_list" ADD CONSTRAINT "FK_e636800325a5ce8c7524ce1dec5" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_list" DROP CONSTRAINT "FK_e636800325a5ce8c7524ce1dec5"`);
        await queryRunner.query(`ALTER TABLE "task_list" ADD CONSTRAINT "FK_e636800325a5ce8c7524ce1dec5" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
