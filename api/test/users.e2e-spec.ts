import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersService } from 'src/users/users.service';

describe('Users E2E tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const usersService = app.get(UsersService);
    const user = await usersService.findOneByEmail('abebe67@gmail.com');
    if (user) {
      await usersService.remove(user.id);
    }
  });
  afterAll(async () => {
    await app.close();
  });

  describe('POST /users', () => {
    it('create a user if valid data is provided', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          fullname: 'Abebe Bekele',
          email: 'abebe67@gmail.com',
          password: 'abeba1221$$',
        })
        .expect(201)
        .expect(/Abebe Bekele/);
    });
  });
});
