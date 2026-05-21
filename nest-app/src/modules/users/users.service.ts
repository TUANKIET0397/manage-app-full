import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { hashPasswordHelper } from '@/helpers/utils';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>, //userModel là một instance của Model<User>, nó sẽ được sử dụng để truy vấn database, ví dụ như tạo mới người dùng, lấy danh sách người dùng, cập nhật người dùng và xóa người dùng. Việc sử dụng @InjectModel(User.name) giúp cho việc inject model trở nên dễ dàng hơn và đảm bảo rằng model được inject đúng với tên của schema đã định nghĩa.
  ) {}

  isEmailExist = async (email: string) => {
    //có thể đếm, nhưng sẽ tốn thời gian hơn, nên sẽ dùng exists để kiểm tra xem email đã tồn tại hay chưa, nếu tồn tại thì trả về true, ngược lại trả về false
    const isExist = await this.userModel.exists({ email }); //email là duy nhất nên sẽ trả về true hoặc false, nếu có email này thì trả về true, ngược lại trả về false - viết tắt của email: email
    return !!isExist; // !! là toán tử phủ định kép, nó sẽ chuyển giá trị của isExist thành boolean. Nếu isExist có giá trị (tức là email tồn tại), thì !!isExist sẽ trả về true. Ngược lại, nếu isExist là null hoặc undefined (tức là email không tồn tại), thì !!isExist sẽ trả về false.
  };

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;
    // kiểm tra xem email đã tồn tại hay chưa, nếu đã tồn tại thì sẽ trả về lỗi, ngược lại sẽ tiếp tục tạo mới người dùng
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadGatewayException(`Email: ${email} already exists`); // BadGatewayException là một exception được cung cấp bởi NestJS, nó sẽ trả về mã lỗi 502 và thông báo lỗi 'Email already exists' khi email đã tồn tại trong database. Việc sử dụng exception này giúp cho việc xử lý lỗi trở nên dễ dàng hơn và đảm bảo rằng client nhận được phản hồi lỗi một cách rõ ràng và chính xác.
    }

    //hash password - có thể viết try and catch ở đây - nên viết một exception tổng quan
    // nếu tư duy theo dependence injection thì sẽ viết một service riêng để hash password
    // , sau đó inject vào đây để sử dụng, nhưng ở đây mình sẽ viết trực tiếp ở đây luôn
    const hashPassword = await hashPasswordHelper(password);
    // sau khi hash xong thì sẽ lưu vào database
    // nên return id của user
    // tầng service sẽ không trả về toàn bộ user mà chỉ trả về id của user mới tạo, để đảm bảo bảo mật thông tin của user
    // tầng controller sẽ nhận id của user mới tạo và trả về cho client, để client có thể sử dụng id này để truy cập các thông tin khác của user nếu cần thiết
    // tầng service là nơi chứa logic kinh doanh, nên sẽ xử lý các thao tác liên quan đến dữ liệu, như tạo mới, lấy danh sách, cập nhật và xóa người dùng. Trong trường hợp này, khi tạo mới một người dùng, service sẽ hash password trước khi lưu vào database để đảm bảo an toàn thông tin của người dùng. Sau đó, service sẽ trả về id của người dùng mới tạo để controller có thể trả về cho client.
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      image,
    });
    return {
      _id: user._id,
    };
  }

  // findAll sẽ nhận các query từ client, sau đó sẽ chuyển đổi các query này thành các điều kiện để truy vấn database,
  // ví dụ như status=sent&timestamp>2016-01-01&author.firstName=/john/i&limit=100&skip=50&sort=-timestamp&populate=logs&fields=id,logs.ip
  // sẽ được chuyển đổi thành các điều kiện để truy vấn database, sau đó sẽ trả về kết quả cho client.
  //  Ở đây mình sẽ sử dụng thư viện api-query-params để chuyển đổi các query này thành các điều kiện để truy vấn database, sau đó sẽ trả về kết quả cho client.
  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;
    //ngoài filter như thế này, thì cần biết bao nhiêu phần tử ở front end để có thể tính được skip,
    // ví dụ như nếu pageSize là 10, thì skip sẽ là (current - 1) * pageSize,
    //  tức là nếu current là 1 thì skip sẽ là 0, nếu current là 2 thì skip sẽ là 10, nếu current là 3 thì skip sẽ là 20,
    // và cứ như vậy. Điều này giúp cho việc phân trang trở nên dễ dàng hơn và hiệu quả hơn khi truy vấn database.
    // Nếu không có skip thì sẽ trả về tất cả các phần tử trong database
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (+current - 1) * +pageSize;

    const results = await this.userModel
      .find(filter) // filter là các điều kiện để truy vấn database, nó sẽ được chuyển đổi từ query của client, ví dụ như status=sent&timestamp>2016-01-01&author.firstName=/john/i sẽ được chuyển đổi thành các điều kiện để truy vấn database, sau đó sẽ trả về kết quả cho client.
      .limit(pageSize) // giới hạn số lượng phần tử trả về, để tránh trả về quá nhiều phần tử trong một lần truy vấn, điều này giúp cho việc phân trang trở nên hiệu quả hơn khi truy vấn database. Nếu không có limit thì sẽ trả về tất cả các phần tử trong database
      .skip(skip) // skip là số phần tử cần bỏ qua, nó sẽ giúp cho việc phân trang trở nên dễ dàng hơn và hiệu quả hơn khi truy vấn database. Nếu không có skip thì sẽ trả về tất cả các phần tử trong database, điều này sẽ gây ra vấn đề về hiệu suất khi truy vấn database, đặc biệt là khi có nhiều phần tử trong database. Việc sử dụng skip giúp cho việc phân trang trở nên hiệu quả hơn khi truy vấn database, vì nó chỉ trả về các phần tử cần thiết cho trang hiện tại, thay vì trả về tất cả các phần tử trong database.
      .select('-password') // loại bỏ trường password khi trả về kết quả cho client, để đảm bảo an toàn thông tin của người dùng
      .sort(sort as any); // sort là các điều kiện để sắp xếp kết quả trả về, nó sẽ được chuyển đổi từ query của client, ví dụ như sort=-timestamp sẽ được chuyển đổi thành các điều kiện để sắp xếp kết quả trả về, sau đó sẽ trả về kết quả cho client. Nếu không có sort thì sẽ trả về kết quả theo thứ tự mặc định của database
    return { results, totalPages }; // trả về kết quả cho client, bao gồm kết quả và tổng số trang, để client có thể hiển thị kết quả một cách chính xác và đầy đủ thông tin. Việc trả về tổng số trang giúp cho việc phân trang trở nên dễ dàng hơn và hiệu quả hơn khi hiển thị kết quả cho client.
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  //bth có thể custom tìm theo email hoặc phone number
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id }, //Điều kiện để tìm kiếm người dùng cần cập nhật, ở đây mình sẽ tìm kiếm người dùng theo _id, vì _id là duy nhất nên sẽ trả về đúng một người dùng cần cập nhật
      { ...updateUserDto }, // dùng tạm thời, sau này chỉ những trường nào muốn update thì mới truyền vào đây, để tránh việc cập nhật những trường không cần thiết, ví dụ như email hoặc password, vì những trường này sẽ có những logic riêng khi cập nhật, ví dụ như khi cập nhật email thì cần phải kiểm tra xem email mới đã tồn tại hay chưa, nếu đã tồn tại thì sẽ trả về lỗi, ngược lại sẽ tiếp tục cập nhật email mới cho người dùng. Tương tự như vậy đối với password, khi cập nhật password thì cần phải hash password mới trước khi lưu vào database để đảm bảo an toàn thông tin của người dùng.
      // ví dụ code sau này sẽ chỉ cập nhật trường name, phone, address và image, còn các trường khác sẽ không bị ảnh hưởng khi cập nhật thông tin người dùng
      // { name: updateUserDto.name, phone: updateUserDto.phone, address: updateUserDto.address, image: updateUserDto.image }
    );
  }

  async remove(_id: string) {
    //check _id
    if (mongoose.isValidObjectId(_id)) {
      return this.userModel.deleteOne({ _id: _id });
    } else {
      throw new BadGatewayException(`_id: ${_id} is not format mongodb`);
    }
  }
  // có 2 cách:
  // có thể ở bên dto giống updateUserDto để validate bên Dto
  // hoặc có thể validate trực tiếp ở đây, nhưng cách này sẽ làm cho code trở nên rối hơn và khó bảo trì hơn,
  // vì nó sẽ làm cho service trở nên phức tạp hơn và khó đọc hơn, đặc biệt là khi có nhiều trường cần validate.
  // Việc validate trực tiếp ở service cũng sẽ làm cho việc tái sử dụng code trở nên khó khăn hơn,
  // vì nếu có một trường cần validate giống nhau ở nhiều nơi trong service thì sẽ phải viết lại code validate đó ở nhiều nơi,
  //  điều này sẽ làm cho code trở nên rối hơn và khó bảo trì hơn.
  //  Do đó, việc validate trực tiếp ở service không phải là một cách tốt để xử lý việc validate dữ liệu trong NestJS.

  async handleRegister(registerDto: CreateAuthDto) {
    const { name, email, password } = registerDto;

    //check email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadGatewayException(`Email: ${email} already exists`);
    }

    // hash password
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      isActive: false,
      codeId: uuidv4(),
      codeExpired: dayjs().add(1, 'minute').toDate(), // mã xác nhận sẽ hết hạn sau 1 ngày kể từ khi tạo mới người dùng, để đảm bảo an toàn thông tin của người dùng và tránh việc sử dụng mã xác nhận cũ để kích hoạt tài khoản sau khi đã hết hạn.
    });

    //trả ra phản hồi
    return {
      _id: user._id,
    };
    //send email to user - bất đồng bộ
    // logic gửi email xác nhận đăng ký tài khoản mới cho người dùng, có thể sử dụng một service riêng để gửi email, sau đó inject vào đây để sử dụng, nhưng ở đây mình sẽ viết trực tiếp ở đây luôn, để đơn giản hóa code.
    // ví dụ code gửi email xác nhận đăng ký tài khoản mới cho người dùng sẽ được viết ở đây, sau khi tạo mới người dùng thành công, thì sẽ gửi email xác nhận đăng ký tài khoản mới cho người dùng, để thông báo cho người dùng biết rằng họ đã đăng ký tài khoản thành công và có thể sử dụng tài khoản của mình để đăng nhập vào hệ thống.
  }
}
