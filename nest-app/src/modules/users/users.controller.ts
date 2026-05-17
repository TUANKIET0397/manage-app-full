import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Controller là một phần của kiến trúc MVC (Model-View-Controller) trong NestJS, nó chịu trách nhiệm xử lý các yêu cầu HTTP và trả về phản hồi cho client. Trong đoạn mã này, UsersController được định nghĩa để quản lý các hành động liên quan đến người dùng, như tạo mới, lấy danh sách, cập nhật và xóa người dùng.
// Các phương thức trong controller được trang trí bằng các decorator như @Post(), @Get(), @Patch(), @Delete() để xác định loại yêu cầu HTTP mà chúng xử lý. Ví dụ, phương thức create() được trang trí bằng @Post() để xử lý yêu cầu POST, trong khi findAll() được trang trí bằng @Get() để xử lý yêu cầu GET.
// Mỗi phương thức trong controller sử dụng UsersService để thực hiện các thao tác liên quan đến người dùng, như tạo mới, lấy danh sách, cập nhật và xóa người dùng. UsersService là một lớp dịch vụ (service) được định nghĩa riêng biệt để chứa logic kinh doanh liên quan đến người dùng.
// 👨‍💻users là endpoint chính của controller, nó sẽ được sử dụng để truy cập các phương thức trong controller.
//  Ví dụ, khi client gửi yêu cầu POST đến /users, phương thức create() sẽ được gọi để tạo mới một người dùng. 
// Tương tự, khi client gửi yêu cầu GET đến /users, phương thức findAll() sẽ được gọi để lấy danh sách tất cả người dùng.
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
