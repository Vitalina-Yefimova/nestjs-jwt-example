import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  private users: { email: string, password: string }[] = [];
  
  constructor(private jwtService: JwtService) { }
  
  async register(email: string, password: string) {
    const hashedPassword = await argon2.hash(password);
    this.users.push({ email, password: hashedPassword });
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const token = this.jwtService.sign({ email: user.email });
    return { access_token: token };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

  