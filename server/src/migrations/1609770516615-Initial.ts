import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1609770516615 implements MigrationInterface {
    name = 'Initial1609770516615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "listId" integer NOT NULL, "pos" double precision NOT NULL DEFAULT '65535.5', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "taskListId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_list" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "boardId" integer NOT NULL, "minPos" double precision NOT NULL DEFAULT '65535.5', "maxPos" double precision NOT NULL DEFAULT '65535.5', "pos" double precision NOT NULL DEFAULT '65535.5', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e9f70d01f59395c1dfdc633ae37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creatorId" integer NOT NULL, "minPos" double precision NOT NULL DEFAULT '65535.5', "maxPos" double precision NOT NULL DEFAULT '65535.5', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_47fc40cc98de35bf7aaaaaeeac5" FOREIGN KEY ("taskListId") REFERENCES "task_list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_list" ADD CONSTRAINT "FK_e636800325a5ce8c7524ce1dec5" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_edd0f21e2c0183c2908e3075f72" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_edd0f21e2c0183c2908e3075f72"`);
        await queryRunner.query(`ALTER TABLE "task_list" DROP CONSTRAINT "FK_e636800325a5ce8c7524ce1dec5"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_47fc40cc98de35bf7aaaaaeeac5"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task_list"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
