# Nest App

## Giải nghĩa dependencies

| Gói                        | Công dụng                                              |
| -------------------------- | ------------------------------------------------------ |
| `@nestjs-modules/mailer`   | Tích hợp gửi email trong Nest (wrapper cho Nodemailer) |
| `@nestjs/common`           | Decorator, helper, exception, guard cơ bản của Nest    |
| `@nestjs/config`           | Quản lý cấu hình từ env và file cấu hình               |
| `@nestjs/core`             | Runtime và DI container của Nest                       |
| `@nestjs/jwt`              | Hỗ trợ JWT (sign/verify, guard)                        |
| `@nestjs/mapped-types`     | Hỗ trợ tạo DTO kiểu `PartialType`, `PickType`, ...     |
| `@nestjs/mongoose`         | Tích hợp Mongoose vào Nest                             |
| `@nestjs/passport`         | Tích hợp Passport strategy                             |
| `@nestjs/platform-express` | Adapter Express cho Nest HTTP                          |
| `@types/nodemailer`        | TypeScript types cho Nodemailer (thường dùng lúc dev)  |
| `api-query-params`         | Parse query string thành filter/sort/pagination        |
| `bcrypt`                   | Hash mật khẩu                                          |
| `class-transformer`        | Transform/serialize DTO                                |
| `class-validator`          | Validate DTO bằng decorator                            |
| `dayjs`                    | Xử lý ngày giờ                                         |
| `handlebars`               | Render template email                                  |
| `mongoose`                 | ODM cho MongoDB                                        |
| `nodemailer`               | Engine gửi email                                       |
| `passport`                 | Middleware xác thực                                    |
| `passport-jwt`             | JWT strategy cho Passport                              |
| `passport-local`           | Username/password strategy                             |
| `reflect-metadata`         | Metadata cho decorator (bắt buộc với Nest)             |
| `rxjs`                     | Reactive streams (Nest dùng nhiều)                     |
| `uuid`                     | Sinh UUID                                              |

## Giải nghĩa devDependencies

| Gói                      | Công dụng                             |
| ------------------------ | ------------------------------------- |
| `@eslint/eslintrc`       | Hỗ trợ cấu hình ESLint                |
| `@eslint/js`             | Bộ config ESLint cho JS               |
| `@nestjs/cli`            | Nest CLI                              |
| `@nestjs/schematics`     | Generator code của Nest               |
| `@nestjs/testing`        | Utils testing cho Nest                |
| `@types/bcrypt`          | Types cho bcrypt                      |
| `@types/express`         | Types cho Express                     |
| `@types/jest`            | Types cho Jest                        |
| `@types/node`            | Types cho Node.js                     |
| `@types/passport-jwt`    | Types cho passport-jwt                |
| `@types/passport-local`  | Types cho passport-local              |
| `@types/supertest`       | Types cho supertest                   |
| `eslint`                 | Linter                                |
| `eslint-config-prettier` | Tắt rule ESLint xung đột với Prettier |
| `eslint-plugin-prettier` | Chạy Prettier như rule ESLint         |
| `globals`                | Global variables cho ESLint           |
| `jest`                   | Test runner                           |
| `prettier`               | Formatter                             |
| `source-map-support`     | Stack trace đúng line TS              |
| `supertest`              | Test HTTP                             |
| `ts-jest`                | Jest transformer cho TS               |
| `ts-loader`              | Loader TS cho Webpack                 |
| `ts-node`                | Chạy TS trực tiếp                     |
| `tsconfig-paths`         | Hỗ trợ path alias khi runtime         |
| `typescript`             | Compiler TS                           |
| `typescript-eslint`      | ESLint parser/rules cho TS            |
