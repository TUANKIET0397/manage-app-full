import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard(
  'Access Token is not valid, not have in header',
) {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here có nghĩa là thêm logic xác thực tùy chỉnh của bạn ở đây
    // for example, call super.logIn(request) to establish a session có nghĩa là ví dụ, gọi super.logIn(request) để thiết lập một phiên làm việc
    // ví dụ const request = context.switchToHttp().getRequest();
    // ví dụ const token = request.headers['authorization']; có nghĩa là nó sẽ lấy token từ header của request, nếu không có token thì sẽ trả về lỗi UnauthorizedException với thông báo 'Access Token is not valid, not have in header'
    // ví dụ if (!token) { throw new UnauthorizedException('Access Token is not valid, not have in header'); } // có nghĩa là
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

// nói chung JwtAuthGuard là một lớp bảo vệ (guard) được sử dụng để bảo vệ các route trong ứng dụng NestJS bằng cách sử dụng JWT (JSON Web Token) để xác thực người dùng.
// Lớp này kế thừa từ AuthGuard của Passport và sử dụng chiến lược JWT để xác thực người dùng dựa trên token được gửi trong header của request.
//  Nếu token không hợp lệ hoặc không có token, nó sẽ trả về lỗi UnauthorizedException.
