# Contributing Guidelines

Cảm ơn bạn đã quan tâm và muốn đóng góp cho dự án **Chúc Mừng 20/10 - Love Project**! Mọi ý kiến đóng góp, sửa lỗi hoặc cải tiến tính năng đều được hoan nghênh.

---

## 🛠️ Quy trình phát triển (Development Workflow)

1. **Fork repository** về tài khoản GitHub của bạn.
2. **Clone** bản fork về máy cá nhân:
   ```bash
   git clone https://github.com/<your-username>/love.git
   cd love
   ```
3. **Cài đặt các dependencies**:
   ```bash
   npm install
   ```
4. **Tạo nhánh (Branch) mới** cho tính năng hoặc bản sửa lỗi:
   ```bash
   git checkout -b feature/ten-tinh-nang-moi
   # hoặc
   git checkout -b fix/mo-ta-loi
   ```
5. **Chạy môi trường phát triển**:
   ```bash
   npm run dev
   ```
   Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để kiểm tra.

---

## 📋 Tiêu chuẩn Code & Quy ước

- **Linting & Type-checking**: Đảm bảo dự án không gặp lỗi TypeScript hoặc ESLint trước khi commit:
  ```bash
  npm run lint
  npm run build
  ```
- **Commit Messages**: Khuyến khích viết commit message rõ ràng, tuân thủ theo chuẩn Conventional Commits:
  - `feat: thêm hiệu ứng pháo hoa mới`
  - `fix: sửa lỗi xoay 3D trên trình duyệt Safari`
  - `docs: cập nhật hướng dẫn cài đặt trong README`
  - `style: căn chỉnh layout giao diện mở thiệp`

---

## 🚀 Gửi Pull Request (PR)

1. Đẩy nhánh của bạn lên GitHub:
   ```bash
   git push origin feature/ten-tinh-nang-moi
   ```
2. Mở một **Pull Request** trỏ về nhánh `main` của repository gốc.
3. Mô tả chi tiết những thay đổi bạn đã thực hiện, kèm ảnh/video chụp màn hình minh họa (nếu có thay đổi về UI/UX).
4. Chờ xét duyệt và thảo luận từ maintainers.

---

## 💬 Báo lỗi & Góp ý ý tưởng

Nếu phát hiện lỗi hoặc có ý tưởng mới, vui lòng tạo một [Issue](https://github.com/xuancanh04/love/issues) và chọn đúng template (Bug report hoặc Feature request).
