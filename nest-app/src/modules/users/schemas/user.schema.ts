
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

//timestamps của mongooes sẽ tự động tạo ra 2 trường createdAt và updatedAt để lưu trữ thời gian tạo và cập nhật của document. 
// Khi bạn sử dụng @Schema({ timestamps: true }), Mongoose sẽ tự động thêm hai trường này vào schema của bạn và quản lý chúng cho bạn.
//  Bạn không cần phải định nghĩa chúng trong schema của mình, Mongoose sẽ tự động xử lý việc cập nhật chúng mỗi khi bạn tạo hoặc cập nhật một document. 
// ví dụ khi bạn tạo một user mới, Mongoose sẽ tự động gán giá trị cho trường createdAt và updatedAt.
// có thể sử dụng các trường này để theo dõi thời gian tạo và cập nhật của các document trong cơ sở dữ liệu của bạn.
// có thể dùng thời gian này để thực hiện các tác vụ như sắp xếp, lọc hoặc kiểm tra xem một document đã được cập nhật gần đây hay chưa.
@Schema( {timestamps: true} ) 
export class User {
    @Prop()
     email: string;

    @Prop()
    password: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;

    @Prop()
    image: string;

    @Prop()
    role: string;

    @Prop()
    accountType: string;

    @Prop()
    isActive: string;

    @Prop()
    codeId: string;

    @Prop()
    codeExpired: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

//@schemas là một decorator được sử dụng trong NestJS để định nghĩa một schema cho một mô hình dữ liệu.
// Nó được sử dụng để đánh dấu một lớp (class) như là một schema và cho phép bạn định nghĩa các thuộc tính và kiểu dữ liệu của các trường trong schema đó.
// Khi bạn sử dụng @Schema() trên một lớp, NestJS sẽ tự động tạo ra một schema dựa trên các thuộc tính và kiểu dữ liệu được định nghĩa trong lớp đó. 
// Bạn có thể sử dụng các decorator khác như @Prop() để định nghĩa các trường trong schema và chỉ định kiểu dữ liệu của chúng. 
// Sau khi định nghĩa xong schema, bạn có thể sử dụng nó để tạo ra một mô hình (model) và thực hiện các thao tác với cơ sở dữ liệu như tạo, đọc, cập nhật và xóa dữ liệu.
// ngoài @prop() còn có các decorator khác như @Prop({ required: true }) để chỉ định rằng trường đó là bắt buộc, hoặc @Prop({ default: 'default value' }) để chỉ định giá trị mặc định cho trường đó.
// ví dụ nếu bạn muốn định nghĩa một trường email là bắt buộc, bạn có thể sử dụng @Prop({ required: true }) như sau:
// @Prop({ required: true })
// email: string;
// Điều này sẽ đảm bảo rằng khi bạn tạo một document mới, trường email phải được cung cấp và không được để trống. Nếu bạn cố gắng tạo một document mà không cung cấp giá trị cho trường email, Mongoose sẽ trả về lỗi.