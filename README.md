# Manage App - Fullstack Application

🚀 Một ứng dụng quản lý nhà hàng/đơn hàng fullstack hiện đại được xây dựng bằng **NestJS** (Backend) và **Next.js** (Frontend).

## 📋 Mục Lục

- [Giới Thiệu](#-giới-thiệu)
- [Tính Năng](#-tính-năng)
- [Công Nghệ](#-công-nghệ)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [Cài Đặt](#-cài-đặt)
- [Cấu Hình Biến Môi Trường](#-cấu-hình-biến-môi-trường)
- [Chạy Ứng Dụng](#-chạy-ứng-dụng)
- [API Documentation](#-api-documentation)
- [Đóng Góp](#-đóng-góp)
- [License](#-license)

## 🎯 Giới Thiệu

**Manage App** là một hệ thống quản lý toàn diện cho nhà hàng/quán ăn với các tính năng:
- ✅ Quản lý người dùng và xác thực
- ✅ Quản lý menu, items và tùy chọn
- ✅ Quản lý đơn hàng chi tiết
- ✅ Hệ thống đánh giá và yêu thích
- ✅ Gửi email tự động (xác nhận đơn hàng, thông báo)
- ✅ Dashboard admin với Ant Design UI

## ✨ Tính Năng

### Backend (NestJS)
- 🔐 **Xác thực & Phân quyền**
  - Đăng nhập/Đăng ký với JWT
  - Passport strategies (Local + JWT)
  - Password hashing với bcrypt
  
- 📧 **Hệ Thống Email**
  - Gửi email qua SMTP Gmail
  - Templates động với Handlebars
  - Xác nhận tài khoản qua mã activation code
  
- 📊 **API RESTful**
  - CRUD operations cho tất cả resources
  - Query filtering & pagination
  - Error handling toàn bộ
  
- 💾 **Database**
  - MongoDB với Mongoose ODM
  - Schema validation
  - Relationships management

### Frontend (Next.js)
- 🎨 **UI Components**
  - Ant Design components library
  - Tailwind CSS styling
  - Responsive design
  
- 🔐 **Authentication**
  - NextAuth integration
  - Session management
  - Protected routes
  
- 📱 **Modern UX**
  - Server-side rendering (SSR)
  - Static generation
  - Real-time updates

## 🛠 Công Nghệ

### Backend Stack
```json
{
  "framework": "NestJS 11.0.1",
  "runtime": "Node.js",
  "database": "MongoDB 9.6.2 + Mongoose",
  "authentication": "Passport + JWT",
  "email": "Nodemailer + Handlebars",
  "language": "TypeScript 5.7.3",
  "testing": "Jest",
  "linting": "ESLint + Prettier"
}
```

### Frontend Stack
```json
{
  "framework": "Next.js 16.2.6",
  "library": "React 19.2.4",
  "ui": "Ant Design 6.4.2",
  "styling": "Tailwind CSS 4",
  "auth": "NextAuth 5.0.0-beta.31",
  "language": "TypeScript 5",
  "linting": "ESLint"
}
```

## 📁 Cấu Trúc Dự Án

```
manage-app-full/
│
├── nest-app/                    # Backend Application
│   ├── src/
│   │   ├── auth/               # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── passport/
│   │   │   └── dto/
│   │   │
│   │   ├── modules/            # Feature modules
│   │   │   ├── users/          # Users management
│   │   │   ├── restaurants/    # Restaurants management
│   │   │   ├── menus/          # Menus management
│   │   │   ├── menu.items/     # Menu items
│   │   │   ├── menu.item.options/
│   │   │   ├── orders/         # Orders management
│   │   │   ├── order.detail/   # Order details
│   │   │   ├── reviews/        # Reviews & ratings
│   │   │   └── likes/          # Likes system
│   │   │
│   │   ├── core/               # Core infrastructure
│   │   │   └── transform.interceptor.ts
│   │   │
│   │   ├── decorator/          # Custom decorators
│   │   ├── mail/               # Email templates
│   │   └── app.module.ts       # Root module
│   │
│   ├── test/                   # E2E tests
│   ├── dist/                   # Compiled output
│   ├── package.json
│   └── tsconfig.json
│
├── next-app/                    # Frontend Application
│   ├── app/                    # App router pages
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/             # Reusable components
│   ├── lib/                    # Utilities & helpers
│   ├── public/                 # Static assets
│   ├── styles/                 # Global styles
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: v18.x hoặc cao hơn
- **npm**: v9.x hoặc cao hơn (hoặc yarn/pnpm)
- **MongoDB**: v5.0 hoặc cao hơn
- **Git**: v2.x hoặc cao hơn

## 🚀 Cài Đặt

### 1. Clone Repository

```bash
git clone https://github.com/TUANKIET0397/manage-app-full.git
cd manage-app-full
```

### 2. Cài Đặt Dependencies

#### Backend
```bash
cd nest-app
npm install
```

#### Frontend
```bash
cd ../next-app
npm install
```

## ⚙️ Cấu Hình Biến Môi Trường

### Backend - `nest-app/.env`

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/manage-app

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_ACCESS_TOKEN_EXPIATED=86400  # 24 hours in seconds

# Email Configuration (Gmail)
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password  # Use Gmail App Password, not regular password

# Application
PORT=3001
NODE_ENV=development
```

**Lưu ý về Gmail App Password:**
1. Bật 2-Factor Authentication trên tài khoản Google
2. Vào [Google Account → Security → App passwords](https://myaccount.google.com/apppasswords)
3. Chọn Mail + Windows Computer (hoặc thiết bị tương ứng)
4. Copy mật khẩu ứng dụng và dán vào `SMTP_PASS`

### Frontend - `next-app/.env.local`

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key_here
```

## 🎮 Chạy Ứng Dụng

### Chế Độ Development

#### Backend
```bash
cd nest-app
npm run start:dev
```
Backend sẽ chạy tại: `http://localhost:3001`

#### Frontend (trong terminal khác)
```bash
cd next-app
npm run dev
```
Frontend sẽ chạy tại: `http://localhost:3000`

### Chế Độ Production

#### Backend
```bash
cd nest-app
npm run build
npm run start:prod
```

#### Frontend
```bash
cd next-app
npm run build
npm run start
```

## 🧪 Testing

### Backend Unit Tests
```bash
cd nest-app
npm run test
```

### Backend E2E Tests
```bash
cd nest-app
npm run test:e2e
```

### Backend Test Coverage
```bash
cd nest-app
npm run test:cov
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Đăng ký tài khoản mới | ❌ |
| POST | `/auth/login` | Đăng nhập | ❌ |
| POST | `/auth/check-code` | Xác nhận mã activation | ❌ |
| POST | `/auth/retry-active` | Gửi lại mã xác nhận | ❌ |
| POST | `/auth/retry-password` | Gửi lại mã đặt lại mật khẩu | ❌ |
| POST | `/auth/change-password` | Đổi mật khẩu | ❌ |

### Users Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/users` | Lấy danh sách users | ✅ |
| GET | `/users/:id` | Lấy thông tin user | ✅ |
| POST | `/users` | Tạo user mới | ✅ |
| PATCH | `/users/:id` | Cập nhật user | ✅ |
| DELETE | `/users/:id` | Xóa user | ✅ |

### Restaurants Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/restaurants` | Lấy danh sách nhà hàng |
| GET | `/restaurants/:id` | Chi tiết nhà hàng |
| POST | `/restaurants` | Tạo nhà hàng |
| PATCH | `/restaurants/:id` | Cập nhật nhà hàng |
| DELETE | `/restaurants/:id` | Xóa nhà hàng |

### Orders Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | Lấy danh sách đơn hàng |
| GET | `/orders/:id` | Chi tiết đơn hàng |
| POST | `/orders` | Tạo đơn hàng |
| PATCH | `/orders/:id` | Cập nhật đơn hàng |
| DELETE | `/orders/:id` | Xóa đơn hàng |

### Query Parameters

Sử dụng `api-query-params` để filter, sort, paginate:

```bash
# Filtering
GET /users?filter[status]=active

# Sorting
GET /users?sort=-createdAt,name

# Pagination
GET /users?page=1&limit=10

# Combined
GET /orders?filter[status]=pending&sort=-createdAt&page=1&limit=20
```

## 🏗 Architecture

### Backend Architecture

```
Request → Controller → Service → Repository (Mongoose) → MongoDB
   ↓
Guard (JWT, Local)
   ↓
Decorator (Metadata)
   ↓
Interceptor (Transform Response)
```

### Key Components

1. **Controllers** - Xử lý HTTP requests
2. **Services** - Business logic
3. **Schemas** - Database models (MongoDB)
4. **DTOs** - Data validation & transformation
5. **Guards** - Authorization & Authentication
6. **Interceptors** - Response formatting
7. **Decorators** - Custom metadata

## 📝 Linting & Formatting

```bash
cd nest-app

# Fix linting issues
npm run lint

# Format code
npm run format
```

```bash
cd next-app

# Lint code
npm run lint
```

## 🐛 Debugging

### Backend Debugging

```bash
cd nest-app

# Start debugger
npm run start:debug
```
Sau đó attach debugger tại `chrome://inspect`

### Frontend Debugging
- Sử dụng React DevTools extension
- Browser DevTools (F12)

## 🔒 Security Best Practices

- ✅ Environment variables cho sensitive data
- ✅ JWT token expiration
- ✅ Password hashing với bcrypt
- ✅ CORS configuration
- ✅ Input validation với class-validator
- ✅ Rate limiting (recommended to add)
- ✅ SQL/NoSQL injection prevention

## 📦 Deployment

### Heroku Deployment (Backend)

```bash
# Add Heroku remote
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Vercel Deployment (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🤝 Đóng Góp

Chúng tôi chào đón những đóng góp từ cộng đồng!

### Steps:
1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Dự án này được cấp phép dưới MIT License - xem chi tiết trong file [LICENSE](LICENSE)

## 👥 Tác Giả

**TUANKIET0397**
- GitHub: [@TUANKIET0397](https://github.com/TUANKIET0397)

## 📞 Support

Nếu bạn gặp vấn đề, vui lòng:
1. Kiểm tra [Issues](https://github.com/TUANKIET0397/manage-app-full/issues)
2. Tạo issue mới với mô tả chi tiết
3. Đặt tiêu đề rõ ràng và thêm labels thích hợp

## 🙏 Cảm Ơn

- NestJS documentation
- Next.js documentation
- Ant Design components
- MongoDB & Mongoose
- Tất cả contributors

---

**Last Updated**: 2026-06-02 | **Status**: 🟢 Active Development
