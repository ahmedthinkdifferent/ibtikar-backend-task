import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { BaseAppController } from '../../../base/BaseAppController';
import { LoginPipe } from '../validators/login.pipe';
import { UserRepository } from '../../../../../database/repositories/UserRepository';
import { BadRequestAppException } from '../../../../exceptions/BadRequestAppException';
import EncryptService from '../../../../../shared/EncryptService';
import HashUtil from '../../../../../utils/HashUtil';
import { JwtAuthService } from '../../../../../shared/JwtAuthService';
import { RegisterPipe } from '../validators/register.pipe';


@Controller('/userApi/v1/auth')
export default class AuthController extends BaseAppController {

  constructor(private readonly userRepository: UserRepository, private readonly encryptService: EncryptService, private jwtService: JwtAuthService) {
    super();
  }

  @Post('/login')
  async login(@Req() req, @Res() res, @Body(LoginPipe) body) {
    const user = await this.userRepository.findOne({ email: body.email },[], false);
    if (!user) {
      throw new BadRequestAppException('user_not_found');
    }
    // check user password.
    const isPasswordMatch = await HashUtil.isMatch(body.password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestAppException('user_not_found');
    }
    const userJson: any = user.toJSON();
    userJson.token = await this.jwtService.sign(userJson);

    return this.getHttpResponse().setDataWithKey('user', userJson).send(req, res);
  }

  @Post('/register')
  async register(@Req() req, @Res() res, @Body(RegisterPipe) body) {
    const userWithSameEmail = await this.userRepository.findOne({ email: body.email }, ['id']);
    if (userWithSameEmail) {
      throw new BadRequestAppException('email_exists_before');
    }
    // register user.
    body.password = await HashUtil.hash(body.password);
    const user = await this.userRepository.create(body);
    const userJson: any = user.toJSON();
    userJson.token = await this.jwtService.sign(userJson);

    return this.getHttpResponse().setDataWithKey('user', userJson).setMessage('user_registered').send(req, res);
  }
}