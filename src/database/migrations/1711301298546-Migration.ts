import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1711301298546 implements MigrationInterface {
  name = 'Migration1711301298546';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create User table
    await queryRunner.query(
      `CREATE TABLE "user" (
         "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "login" character varying NOT NULL,
         "password" character varying NOT NULL,
         "version" integer NOT NULL DEFAULT 1,
         "createdAt" timestamp NOT NULL DEFAULT now(),
         "updatedAt" timestamp NOT NULL DEFAULT now(),
         CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
       )`,
    );

    // Create Artist table
    await queryRunner.query(
      `CREATE TABLE "artist" (
         "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "name" character varying NOT NULL,
         "grammy" boolean NOT NULL,
         "isFavorite" boolean NOT NULL DEFAULT false,
         CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id")
       )`,
    );

    // Create Album table with foreign key to Artist
    await queryRunner.query(
      `CREATE TABLE "album" (
         "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "name" character varying NOT NULL,
         "year" integer NOT NULL,
         "artistId" uuid,
         "isFavorite" boolean NOT NULL DEFAULT false,
         CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"),
         CONSTRAINT "FK_album_artist" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL
       )`,
    );

    // Create Track table with foreign keys to Artist and Album
    await queryRunner.query(
      `CREATE TABLE "track" (
         "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "name" character varying NOT NULL,
         "artistId" uuid,
         "albumId" uuid,
         "duration" integer NOT NULL,
         "isFavorite" boolean NOT NULL DEFAULT false,
         CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"),
         CONSTRAINT "FK_track_artist" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL,
         CONSTRAINT "FK_track_album" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop Track table with foreign keys
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_track_artist"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_track_album"`,
    );
    await queryRunner.query(`DROP TABLE "track"`);

    // Drop Album table with foreign key to Artist
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_album_artist"`,
    );
    await queryRunner.query(`DROP TABLE "album"`);

    // Drop Artist table
    await queryRunner.query(`DROP TABLE "artist"`);

    // Drop User table
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
