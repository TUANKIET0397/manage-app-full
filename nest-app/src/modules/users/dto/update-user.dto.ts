import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  // _id phải dùng mongoDB để tạo ra, nên sẽ không cần phải cung cấp trường _id khi tạo mới người dùng, mà sẽ được tự động tạo ra bởi database khi lưu vào database,
  // sau đó sẽ trả về id của người dùng mới tạo cho client, để client có thể sử dụng id này để truy cập các thông tin khác của người dùng nếu cần thiết.
  @IsMongoId({ message: '_id is not valid' })
  @IsNotEmpty({ message: '_id is required' })
  _id: string;

  @IsOptional() // trường name là tùy chọn khi cập nhật thông tin người dùng, nên sẽ được đánh dấu là optional, để client có thể chỉ cung cấp những trường mà họ muốn cập nhật mà không cần phải cung cấp tất cả các trường như khi tạo mới người dùng.
  name: string;

  @IsOptional() // khi set whitelist la true thì nó sẽ loại bỏ những trường không có trong DTO, nên khi cập nhật thông tin người dùng thì sẽ chỉ cho phép cập nhật những trường có trong DTO, còn những trường khác sẽ bị loại bỏ khi nhận dữ liệu từ client, để đảm bảo an toàn thông tin của người dùng và tránh việc cập nhật những trường không cần thiết.
  phone: string;

  @IsOptional()
  address: string;

  @IsOptional()
  image: string;
}

//export class UpdateUserDto extends PartialType(CreateUserDto) {}
// PartialType là một hàm được cung cấp bởi NestJS, nó sẽ tạo ra một lớp mới dựa trên lớp đã cho,
//  nhưng tất cả các trường trong lớp mới sẽ trở thành tùy chọn (optional).
// Điều này có nghĩa là khi sử dụng UpdateUserDto, bạn không cần phải cung cấp tất cả các trường như khi sử dụng CreateUserDto,
//  mà chỉ cần cung cấp những trường mà bạn muốn cập nhật.
// Việc sử dụng PartialType giúp cho việc cập nhật thông tin người dùng trở nên linh hoạt hơn và dễ dàng hơn.
//ví dụ như khi cập nhật thông tin người dùng, bạn chỉ cần cung cấp trường name nếu bạn muốn cập nhật tên của người dùng,
//  mà không cần phải cung cấp các trường khác như email, password, phone, address hoặc image.
//  Điều này giúp cho việc cập nhật thông tin người dùng trở nên đơn giản hơn và
// tránh việc phải cung cấp các trường không cần thiết khi chỉ muốn cập nhật một số thông tin cụ thể của người dùng.
// vi dụ code sử dụng UpdateUserDto trong controller
/*
@Patch(':id')
update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  return this.usersService.update(+id, updateUserDto);
}
*/
