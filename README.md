# 🛍️ E-commerce Store KunT- Frontend

Một ứng dụng e-commerce hiện đại được xây dựng với React và Vite, cung cấp trải nghiệm mua sắm trực tuyến đầy đủ tính năng.

## ✨ Tính năng chính

- 🏠 **Trang chủ** - Hiển thị banner, sản phẩm nổi bật, flash sale
- 🛒 **Giỏ hàng** - Quản lý sản phẩm, tính toán giá
- 👤 **Tài khoản** - Đăng ký, đăng nhập, quản lý thông tin cá nhân
- 📦 **Sản phẩm** - Xem chi tiết, đánh giá, tìm kiếm
- 💳 **Thanh toán** - Hỗ trợ nhiều phương thức thanh toán
- 🎫 **Voucher** - Mã giảm giá và khuyến mãi
- 📱 **Responsive** - Tương thích mọi thiết bị

## 🛠️ Công nghệ sử dụng

- **React 19** - UI Framework
- **Vite** - Build tool nhanh
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Ant Design** - UI Components
- **Sass** - CSS Preprocessor
- **Axios** - HTTP Client
- **React Hook Form** - Form handling

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Cấu hình môi trường
```bash
# Copy file env-template.txt thành .env
cp env-template.txt .env

# Chỉnh sửa các biến môi trường trong file .env
```

### Chạy ứng dụng
```bash
# Development mode
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

## 📁 Cấu trúc thư mục

```
src/
├── components/          # React components
│   ├── header/         # Header navigation
│   ├── footer/         # Footer
│   ├── product/        # Product components
│   ├── cart/           # Cart components
│   └── ...
├── pages/              # Page components
│   ├── HomePage/       # Trang chủ
│   ├── Account/        # Trang tài khoản
│   ├── Cart/           # Trang giỏ hàng
│   └── ...
├── reduxs/             # Redux store & slices
├── hooks/              # Custom hooks
├── helper/             # Utility functions
└── assets/             # Static assets
```

## 🔧 Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Preview build
- `npm run lint` - Kiểm tra code style



## 🗄️ Cơ sở dữ liệu MongoDB

Dự án này sử dụng **MongoDB** làm hệ quản trị cơ sở dữ liệu.

MongoDB là một cơ sở dữ liệu NoSQL dạng tài liệu, lưu trữ dữ liệu dưới dạng **JSON-like documents** (gọi là BSON). Một số điểm nổi bật của MongoDB:

- **Không có cấu trúc bảng cố định:** Dữ liệu được lưu dưới dạng document linh hoạt, dễ thay đổi schema.
- **Khả năng mở rộng cao:** Hỗ trợ phân mảnh (sharding) giúp dễ dàng mở rộng khi dữ liệu lớn.
- **Hiệu suất cao:** Tối ưu cho truy vấn nhanh trên các tập dữ liệu lớn.
- **Hỗ trợ đa dạng ngôn ngữ:** Có driver cho hầu hết các ngôn ngữ lập trình phổ biến.
- **Tích hợp tốt với các ứng dụng hiện đại:** Phù hợp với các ứng dụng web, mobile, realtime.

MongoDB giúp cho việc phát triển ứng dụng nhanh chóng và linh hoạt, đặc biệt trong môi trường Agile.


## ☁️ Các dịch vụ sử dụng trong dự án

### Cloudinary - Lưu trữ ảnh
Dự án sử dụng **Cloudinary** để lưu trữ và quản lý hình ảnh. Cloudinary là dịch vụ đám mây chuyên về quản lý media, cung cấp các tính năng:

- Lưu trữ ảnh và video an toàn, ổn định.
- Tự động tối ưu và chuyển đổi định dạng ảnh để tải nhanh.
- Hỗ trợ CDN giúp phân phối nội dung toàn cầu.
- Các API mạnh mẽ dễ dàng tích hợp với ứng dụng.

### Dịch vụ gửi email
Dự án tích hợp dịch vụ gửi email để:

- Gửi email xác nhận đăng ký, đặt lại mật khẩu.
- Thông báo các sự kiện quan trọng đến người dùng.
- Dịch vụ thường sử dụng như **SendGrid**, **Mailgun**, hoặc **Nodemailer** kết hợp SMTP.

### Đăng nhập bằng email
Hệ thống hỗ trợ đăng nhập và xác thực người dùng qua email bằng cách:

- Gửi email xác thực để kích hoạt tài khoản.
- Sử dụng OTP hoặc link đăng nhập một lần (magic link).
- Bảo mật thông qua xác thực hai yếu tố (2FA) nếu cần.

### Thanh toán
Dự án tích hợp hệ thống thanh toán trực tuyến để:

- Sử dụng các cổng thanh toán phổ biến như **Vnpay**, hoặc **Momo**.
- Đảm bảo bảo mật dữ liệu khách hàng với tiêu chuẩn PCI DSS.
- Quản lý hóa đơn, lịch sử giao dịch, và hoàn tiền.

---

Nếu bạn muốn, mình có thể giúp bạn soạn các đoạn mã mẫu hoặc hướng dẫn tích hợp cụ thể cho từng dịch vụ trên nhé!


## 🌐 API Endpoints

Ứng dụng kết nối với backend API thông qua các endpoints:
- Base URL: `http://localhost:5000/api`
- Authentication: `/auth`
- Products: `/products`
- Cart: `/cart`
- Orders: `/orders`
- Users: `/users`

## 📝 Ghi chú

- Đảm bảo backend server đang chạy trước khi start frontend
- Cấu hình đúng các biến môi trường trong file `.env`
- Sử dụng ESLint để maintain code quality

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phát hành dưới MIT License.
---
## Thông tin liên lạc

Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng liên hệ với tôi qua:

- **Email:** kunt.hcmus@gmail.com
- **GitHub:** https://github.com/Kun1710 or https://github.com/KunT1710


Mình rất vui được hỗ trợ và nhận góp ý từ bạn!

**Lưu ý**: Đây là phiên bản frontend của dự án e-commerce. Backend API được phát triển riêng biệt.
