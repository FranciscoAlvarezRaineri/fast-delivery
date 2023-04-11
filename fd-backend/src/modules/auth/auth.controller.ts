import { Controller, Get, Body, Patch, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminAuthService } from './admin-auth.service';

import { Request } from 'express';

import { User } from 'firebase/auth';
import { DecodedIdToken } from 'firebase-admin/auth';
import { ApiTags } from '@nestjs/swagger';
import { GeneralError } from 'src/common/error-handlers/exceptions';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminAuthService: AdminAuthService,
  ) {}

  @Get()
  async authenticate(@Req() request: Request): Promise<DecodedIdToken> {
    try {
      const idToken = request.cookies['idToken'];
      const decodedIdToken = await this.adminAuthService.authenticate(idToken);
      return decodedIdToken;
    } catch (error: unknown) {
      throw new GeneralError('No se pudo autenticar el usuario');
    }
  }

  @Get('/current')
  async getCurrentUser(): Promise<User> {
    try {
      const user = await this.authService.getCurrentUser();
      return user;
    } catch (error: unknown) {
      throw new GeneralError('No se pudo devolver el usuario');
    }
  }

  @Delete()
  async delete(): Promise<string> {
    try {
      const user = await this.authService.getCurrentUser();
      await this.authService.delete(user);
      return `User ${user.uid} deleted`;
    } catch (error: unknown) {
      throw new GeneralError('No se pudo actualizar el usuario');
    }
  }

  @Get('/signOut')
  async signOut(): Promise<string> {
    try {
      const user = await this.authService.getCurrentUser();
      await this.authService.signOut();
      return `User ${user.uid} hsa been signed out`;
    } catch (error: unknown) {
      throw new GeneralError('No se pudo hacer un sign out');
    }
  }

  @Patch()
  async update(
    @Body('displayName') displayName: string,
    @Body('photoURL') photoURL: string,
  ): Promise<User | unknown> {
    try {
      const user = await this.authService.getCurrentUser();
      if (displayName) await this.authService.updateName(user, displayName);
      if (photoURL) await this.authService.updatePhotoURL(user, photoURL);
      const updatedUser = await this.authService.getCurrentUser();
      return updatedUser;
    } catch (error: unknown) {
      throw new GeneralError('No se pudo actualizar el usuario');
    }
  }
}
