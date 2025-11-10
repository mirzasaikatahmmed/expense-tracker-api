import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async register(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await this.users.create({ email, passwordHash });
    return this.sign(user._id.toString(), user.email, user.role);
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.sign(user._id.toString(), user.email, user.role);
  }

  private sign(sub: string, email: string, role: string) {
    const access_token = this.jwt.sign({ sub, email, role });
    return { access_token };
  }
}
