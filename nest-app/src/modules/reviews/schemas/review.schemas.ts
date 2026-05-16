import { User } from "@/modules/users/schemas/user.schema"
//import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// nó đươc sử dụng để định nghĩa một schema cho một mô hình dữ liệu trong NestJS.
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
// import { HydratedDocument } from 'mongoose';
// HydratedDocument là một loại dữ liệu được sử dụng trong Mongoose để đại diện cho một document đã được "hydrated" (được làm đầy đủ) với các phương thức và thuộc tính của mô hình dữ liệu.
// Khi bạn truy vấn một document từ cơ sở dữ liệu bằng Mongoose, nó sẽ trả về một đối tượng JavaScript thông thường. Tuy nhiên, nếu bạn muốn sử dụng các phương thức và thuộc tính của mô hình dữ liệu, bạn cần phải "hydrate" (làm đầy đủ) document đó.
// HydratedDocument cho phép bạn làm điều này bằng cách cung cấp một lớp wrapper xung quanh document gốc. Khi bạn sử dụng HydratedDocument, bạn có thể truy cập các phương thức và thuộc tính của mô hình dữ liệu như thể bạn đang làm việc với một instance của mô hình đó.
// Ví dụ, nếu bạn có một mô hình User với một phương thức getFullName(), khi bạn truy vấn một document User từ cơ sở dữ liệu, bạn có thể sử dụng HydratedDocument để truy cập phương thức getFullName() như sau:
// const userDocument = await UserModel.findById(userId);
// const hydratedUser = new HydratedDocument(userDocument);
// console.log(hydratedUser.getFullName());
//export type ReviewDocument = HydratedDocument<Review>;
import mongoose, { HydratedDocument} from "mongoose";
//tóm lại các import này được sử dụng để định nghĩa một schema cho một mô hình dữ liệu trong NestJS,
//  và để đại diện cho một document đã được "hydrated" (được làm đầy đủ) 
// với các phương thức và thuộc tính của mô hình dữ liệu khi làm việc với Mongoose.
export type ReviewDocument = HydratedDocument<Review>; //định nghĩa một kiểu dữ liệu ReviewDocument, nó đại diện cho một document đã được "hydrated" (được làm đầy đủ) với các phương thức và thuộc tính của mô hình dữ liệu Review.

@Schema({timestamps: true})
export class Review {
    //link giữa review và user, restaurant thông qua ObjectId.
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User.name'}) //định nghĩa một trường user trong schema Review, và kiểu dữ liệu của trường này là mongoose.Schema.Types.ObjectId.
    //ref: 'User.name' là một tùy chọn được sử dụng trong Mongoose để thiết lập một tham chiếu (reference) đến một mô hình dữ liệu khác. 
    //Khi bạn sử dụng ref: 'User.name', nó cho phép bạn liên kết trường user trong schema Review với trường name của mô hình User. 
    //Điều này có nghĩa là khi bạn truy vấn một document Review, bạn có thể sử dụng phương thức populate() để tự động lấy thông tin từ mô hình User dựa trên giá trị của trường user trong Review.
    user: mongoose.Schema.Types.ObjectId; //định nghĩa một trường user trong schema Review, và kiểu dữ liệu của trường này là mongoose.Schema.Types.ObjectId.
    //mongoose.Schema.Types.ObjectId là một kiểu dữ liệu đặc biệt trong Mongoose được sử dụng để đại diện cho một ObjectId, 
    //là một loại dữ liệu được sử dụng để lưu trữ các giá trị định danh duy nhất trong MongoDB. 
    //Khi bạn định nghĩa một trường với kiểu dữ liệu mongoose.Schema.Types.ObjectId, nó cho phép bạn lưu trữ các giá trị ObjectId trong cơ sở dữ liệu của bạn.

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant.name'})
    restaurant: mongoose.Schema.Types.ObjectId; //định nghĩa một trường restaurant trong schema Review, và kiểu dữ liệu của trường này cũng là mongoose.Schema.Types.ObjectId.

    //định nghĩa một trường rating trong schema Review, và kiểu dữ liệu của trường này là Number.
    //min: 1, max: 5 là các tùy chọn được sử dụng để chỉ định giá trị tối thiểu và tối đa cho trường rating. 
    //Điều này có nghĩa là khi bạn tạo hoặc cập nhật một document Review, giá trị của trường rating phải nằm trong khoảng từ 1 đến 5. Nếu bạn cố gắng gán một giá trị ngoài khoảng này, Mongoose sẽ trả về lỗi.
    @Prop({type: Number, min: 1, max: 5})
    rating: number;

     @Prop()
    image: string;

     @Prop()
    comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
//SchemaFactory.createForClass(Review) là một phương thức được sử dụng trong NestJS để tạo ra một schema từ một lớp (class) đã được đánh dấu bằng @Schema().
// Khi bạn gọi SchemaFactory.createForClass(Review), nó sẽ tự động tạo ra một schema dựa trên các thuộc tính và kiểu dữ liệu được định nghĩa trong lớp Review.
// Phương thức này sẽ đọc các thuộc tính của lớp Review và tạo ra một schema tương ứng với các trường và kiểu dữ liệu của chúng. 
// Sau khi tạo ra schema, bạn có thể sử dụng nó để tạo ra một mô hình (model) và thực hiện các thao tác với cơ sở dữ liệu như tạo, đọc, cập nhật và xóa dữ liệu.