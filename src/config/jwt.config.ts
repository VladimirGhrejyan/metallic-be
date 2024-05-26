import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = (): JwtModuleOptions => ({
  secret: `${process.env.JWT_SECRET}`,
  signOptions: {
    expiresIn: '7d',
  },
});
