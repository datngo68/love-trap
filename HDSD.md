# 📖 Hướng Dẫn Sử Dụng: Web App "Em Có Yêu Anh Không?"

Dự án tương tác giải trí lãng mạn giúp bạn mượn công nghệ để... tỏ tình hoặc troll người yêu một cách cực kì dễ thương.

---

## 🚀 1. Tổng quan dự án (What is this?)

Ứng dụng web "Em Có Yêu Anh Không?" là một trang web tương tác với cách thức hoạt động như sau:
- Mở màn với lời chào cực cute và trái tim bay lượn (Splash Screen).
- Màn hình chính hỏi: **"Em có yêu anh không?"**.
  - Nếu người dùng bấm **CÓ**: Pháo giấy nổ tung (Confetti), hiệu ứng rực rỡ, nhạc chiến thắng vang lên chức mừng 🎉.
  - Nếu người dùng tính bấm **KHÔNG**: Nút "Không" sẽ **né tránh chuột/ngón tay** (Dodge mechanic). Tuy nhiên trên mobile nếu cố gắng chạm trúng, hệ thống sẽ phạt người dùng bằng một **Thử thách mini-game (Challenge)**. Người dùng phải hoàn thành thử thách (hoặc bấm bỏ qua) thì mới được quay lại màn hình trả lời câu hỏi!

---

## 🎯 2. Tính năng nổi bật

- **Thay đổi Tên linh hoạt**: Dễ dàng chỉnh tên Người gửi / Người nhận mà KHÔNG CẦN biết code.
- **URL Base64 Sharing**: Mọi cấu hình (Tên, Ngôn ngữ) sẽ được nén vào URL. Bạn chỉ cài đặt 1 lần rồi gửi link đó cho "Crush", họ mở lên sẽ thấy ngay tên của họ.
- **Hệ thống 20 Thử thách (Challenge Engine)**: Gồm 10 thử thách Quiz vui nhộn và 10 mini-game đập phá tim cực bá đạo.
- **Hệ thống âm thanh sống động (SFX + Music)**: Đầy đủ nhạc lãng mạn và âm thanh nút bấm, tương tác.
- **Ứng dụng PWA (Progressive Web App)**: Có thể tải về cài đặt như App xịn trên điện thoại iPhone/Android.
- **Song ngữ (Việt / Anh)**: Hỗ trợ linh hoạt cho cả người Việt và Tây.

---

## 💌 3. Hướng Dẫn Sử Dụng (Dành cho người muốn rải thính)

Nếu ứng dụng đã được deploy (ví dụ: trên link `hoihan.pages.dev`), làm sao để setup tên và gửi cho crush?

### Bước 1: Mở cài đặt (Trang chủ)
Lần đầu bạn vào trang web, ở góc **trên cùng bên phải** có một biểu tượng **Bánh răng cài đặt (Settings)**. Hãy bấm vào đó.

### Bước 2: Điền thông tin của rải thính
1. **Tên người nhận**: Điền tên Crush (Ví dụ: *Ngọc Trinh*)
2. **Tên người gửi**: Điền tên thật của bạn (Ví dụ: *Sơn Tùng*)
3. **Ngôn ngữ**: Chọn Tiếng Việt hoặc Tiếng Anh tuỳ gu.
4. Bấm **Lưu**. Lúc này, giao diện sẽ cập nhật lại text: *"Xin chào Ngọc Trinh!"* và *"Từ Sơn Tùng với tất cả yêu thương"*.

### Bước 3: Lấy link chia sẻ
Sau khi bấm Lưu, nếu bạn để ý **thanh địa chỉ trình duyệt (URL)**, nó đã dài ra và thêm một đoạn như `/#config=...`. Đó là chuỗi Base64 chứa danh tính của 2 bạn. 
Trình tự tốt nhất:
1. Bấm nút **Bắt đầu**.
2. Nhấn vào nút **Có, em yêu** để vượt qua bài test.
3. Ở màn hình Yaaaay (Chúc mừng), bấm tiếp nút **Chia sẻ**. Trình duyệt sẽ tự động Copy hoặc mở bảng Share cái link URL đã cấu hình tên của hai bạn. 
4. Paste (Dán) link ấy và gửi cho Crush của bạn. Xong, chờ kết quả thôi!

---

## 💻 4. Hướng dẫn dành cho Developer / Kỹ thuật viên (Quick Start)

Nếu bạn muốn kéo source code này về máy tính để nghiên cứu hoặc mod thêm tính năng.

### Requirements
- Node.js version 18 trở lên.
- Git.

### Chạy hệ thống local

```bash
# 1. Cài đặt các gói NPM
npm install

# 2. Khởi động môi trường dev
npm run dev

# 3. Web sẽ chạy tại http://localhost:5173 
```

### Cách config mặc định trong Code
Vào thay đổi file `src/store/useAppStore.ts` dòng `initialConfig` nếu bạn muốn khi load lên mặc định là tên fix cứng của bạn mà không cần URL Hash.

### Deploy dự án lên bản Production
```bash
# Build file tĩnh
npm run build
```
Kết quả trả ra thư mục `dist`. Bạn chỉ cần copy thư mục `dist` này up thẳng lên Vercel, Netlify hoặc Cloudflare Pages (với cấu hình Build command `npm run build` và output `dist`).
