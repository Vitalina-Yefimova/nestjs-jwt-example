import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('orders')
export class OrdersController {
  constructor(private authService: AuthService) {}

  @Get()
  getOrders(@Headers('authorization') authHeader: string) {
    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.split(' ')[1];
    const user = this.authService.verifyToken(token);

    return [
      {
        id: 1,
        product: 'Product 1',
        quantity: 1,
        totalPrice: 100,
        createdAt: new Date(),
        user: user.email,
      },
      {
        id: 2,
        product: 'Product 2',
        quantity: 2,
        totalPrice: 200,
        createdAt: new Date(),
        user: user.email,
      },
    ];
  }
}