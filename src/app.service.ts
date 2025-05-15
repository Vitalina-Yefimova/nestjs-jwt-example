import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): { title: string; description: string; routes: string[] } {
    return {
      title: 'Home',
      description: 'Welcome to the home page',
      routes: [
        'POST /auth/register - Register a new user',
        'POST /auth/login - Login and get a token',
        'GET /orders - Get all orders',
      ]
    }
  }
}
