import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(body: any) {
    const { email, password, fullName } = body;
    console.log({ email, password, fullName });

    const userExist = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      throw new BadRequestException(
        'Người dùng đã tồn tại, vui lòng đăng nhập',
      );
    }

    // hash: băm (không thể dịch ngược)
    const hashPassword = bcrypt.hashSync(password, 10);

    const userNew = await this.prisma.users.create({
      data: {
        email: email,
        password: hashPassword,
        fullName: fullName,
      },
    });

    return true;
  }
}
