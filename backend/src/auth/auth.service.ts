import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User, JwtPayload } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SUPABASE_CLIENT) private supabase: SupabaseClient,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Use Supabase Auth to create user
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    // Return user info and JWT token
    if (!data.user) {
      throw new UnauthorizedException('Registration failed');
    }

    const payload: JwtPayload = {
      sub: data.user.id,
      email: data.user.email ?? email,
    };
    return {
      user: {
        id: data.user.id,
        email: data.user.email ?? email,
        name: (data.user.user_metadata?.name as string) || name,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Use Supabase Auth to sign in
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: data.user.id,
      email: data.user.email ?? email,
    };
    return {
      user: {
        id: data.user.id,
        email: data.user.email ?? email,
        name: (data.user.user_metadata?.name as string) || '',
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserById(userId: string): Promise<User | null> {
    try {
      const { data, error } =
        await this.supabase.auth.admin.getUserById(userId);

      if (error || !data) {
        return null;
      }

      return {
        id: data.user.id,
        email: data.user.email ?? '',
        name: (data.user.user_metadata?.name as string) || '',
      };
    } catch {
      return null;
    }
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.validateUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
