# ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)

**Ứng dụng:** “Em Có Yêu Anh Không?” (Frontend SPA)  
**Phiên bản tài liệu:** 1.1  
**Ngày cập nhật:** 08/04/2026  
**Chuẩn tham chiếu:** ISO/IEC/IEEE 29148:2018 (Systems and software engineering — Life cycle processes — Requirements engineering). *Lưu ý: IEEE 830-1998 đã ngừng hiệu lực; nội dung SRS vẫn tương thích về cấu trúc.*

---

## 1. Giới thiệu

### 1.1 Mục đích tài liệu

Tài liệu này mô tả yêu cầu đối với **ứng dụng web frontend đơn trang (SPA)** nhằm:

- Làm cơ sở thống nhất giữa **người đặt hàng / thiết kế trải nghiệm** và **đội phát triển / kiểm thử**.
- Giới hạn **phạm vi**, **giả định**, **ràng buộc** và **tiêu chí chấp nhận** để tránh hiểu sai khi triển khai.

### 1.2 Mục tiêu sản phẩm

Ứng dụng tạo trải nghiệm tương tác **vui, lãng mạn**, với luồng chính:

- **Trả lời “Có”:** Chuyển ngay sang màn **Chúc mừng** (hiệu ứng, có thể có nhạc, lời nhắn cá nhân hóa).
- **Trả lời “Không”:** Vào **chuỗi thử thách**; sau mỗi thử thách quay lại màn câu hỏi với **biến thể câu hỏi**. **Kết thúc nhánh “từ chối” chỉ khi người chơi chọn “Có”** — đây là quy tắc nghiệp vụ cốt lõi (giải trí, không mang tính ràng buộc pháp lý).

Ứng dụng hướng tới **giải trí, kỷ niệm**, có thể dùng tặng người thân/bạn bè (không giới hạn giới tính; văn bản mặc định có thể tùy chỉnh).

### 1.3 Phạm vi (Scope)

| In-scope | Out-of-scope |
|----------|----------------|
| Toàn bộ logic **frontend** (không bắt buộc backend). | Backend, tài khoản, đăng nhập, lưu trữ đám mây. |
| Giao diện **responsive**, ưu tiên **mobile-first**, hỗ trợ desktop. | Thanh toán, quảng cáo, thu thập analytics bên thứ ba (trừ khi bổ sung phiên bản SRS sau). |
| **Challenge Engine** với thư viện **≥ 20** thử thách khác nhau, có thể mở rộng (ví dụ JSON). | Ứng dụng native iOS/Android riêng; có thể cân nhắc **PWA** trong phạm vi nếu ghi rõ trong kế hoạch phát hành. |
| Tùy chỉnh nội dung (tên, câu hỏi, màu, media theo khả năng trình duyệt). | Gửi/nhận file thật qua server (selfie, chat) — chỉ được mô tả dưới dạng **gợi ý ngoài ứng dụng** nếu có. |
| Lưu trạng thái cục bộ (**LocalStorage** và/hoặc **IndexedDB**). | Đồng bộ đa thiết bị. |
| Chia sẻ cấu hình qua **URL** (query/hash) trong giới hạn độ dài và quyền riêng tư (xem mục 2.4). | |

### 1.4 Định nghĩa, viết tắt

| Thuật ngữ | Ý nghĩa |
|-----------|---------|
| FE | Frontend |
| SPA | Single Page Application |
| PWA | Progressive Web App |
| Challenge / Thử thách | Một “trò” hoặc nhiệm vụ ngắn giữa các lần từ chối |
| Phiên (session) | Một lần mở/chơi liên tục; có thể reset khi xóa dữ liệu trình duyệt hoặc theo nút “Chơi lại” |

### 1.5 Tài liệu tham khảo

- ISO/IEC/IEEE 29148:2018  
- Hướng dẫn **Material Design 3** / **Tailwind CSS** (tham khảo UI, không ràng buộc công nghệ)

### 1.6 Bên liên quan (Stakeholders)

| Vai trò | Nhu cầu chính |
|---------|----------------|
| Người tạo link / cấu hình (“anh” trong copy mặc định) | Dễ tùy chỉnh, chia sẻ link, trông đẹp trên điện thoại |
| Người nhận link (“em” trong copy mặc định) | Thao tác đơn giản, vui, không cần kiến thức kỹ thuật |
| Phát triển / QA | Yêu cầu rõ ràng, có thể kiểm thử được |
| Vận hành (nếu có hosting tĩnh) | Build tĩnh, không phụ thuộc server logic |

---

## 2. Mô tả tổng quát

### 2.1 Bối cảnh sản phẩm

- **Kiểu triển khai:** Ứng dụng web tĩnh + JS (hosting CDN/static).  
- **Luồng dữ liệu:** Nhập/tùy chỉnh trên client → lưu cục bộ → tùy chọn mã hóa tham số URL khi chia sẻ.

### 2.2 Chức năng sản phẩm (tóm tắt)

#### 2.2.1 Màn hình khởi động (Splash / Onboarding)

- Logo + tên ứng dụng + **tên người được hỏi** (có thể chỉnh trước khi bắt đầu hoặc trong Settings).  
- Nút **“Bắt đầu”** / **“Bắt đầu hỏi”**.

#### 2.2.2 Màn hình câu hỏi chính (Question Screen)

- Câu hỏi lớn (có thể có animation nhịp tim hoặc tương đương).  
- Hai nút rõ ràng: **“Có”** (màu nổi bật, ví dụ hồng/đỏ) và **“Không”** (màu trung tính).  
- Nút **“Không”**: hiệu ứng **né nhẹ** (ví dụ `transform`) và/hoặc tooltip/copy vui; **truy cập (accessibility)** phải vẫn cho phép chọn “Không” bằng bàn phím / đọc màn hình (không được “khóa” hoàn toàn — xem FR-12).

#### 2.2.3 Màn Chúc mừng (Celebration Screen) — khi chọn “Có”

- Hiệu ứng (Canvas, CSS, thư viện confetti tương thích).  
- Ảnh / minh họa (upload cục bộ **base64**/Object URL **hoặc** URL ảnh công khai — cần ghi chú CORS/giới hạn).  
- Lời chúc (emoji, tên).  
- Nhạc nền: **autoplay bị hạn chế bởi trình duyệt**; yêu cầu có **nút bật nhạc** sau thao tác người dùng (tap/click) — xem NFR-04.  
- Nút **chia sẻ / copy link**.

#### 2.2.4 Màn Thử thách (Challenge Screen) — khi chọn “Không”

- Tiêu đề dạng: *“Thử thách #X — …”* (X là số thứ tự lần vào thử thách trong phiên).  
- Thử thách lấy từ **Challenge Engine** (random có kiểm soát hoặc tuần tự theo cấu hình).  
- Sau khi **hoàn thành hoặc hết thời gian / bỏ qua theo luật từng challenge** → quay lại Question Screen với **câu hỏi biến thể**.  
- Nếu tiếp tục chọn “Không” → challenge tiếp theo (không giới hạn số lần theo mặc định nghiệp vụ).

#### 2.2.5 Challenge Engine — thư viện thử thách (≥ 20)

Phân loại gợi ý (có thể điều chỉnh khi triển khai):

| Loại | Ví dụ | Độ khó gợi ý | Ghi chú triển khai |
|------|--------|----------------|---------------------|
| Tương tác / Click | Ví dụ: click N đối tượng trong T giây | Dễ | Thời gian và N có thể scale theo #challenge |
| Quiz | Câu hỏi trắc nghiệm (4 lựa chọn) | Trung bình | Nội dung có thể tùy chỉnh JSON |
| Nhập text | Viết câu theo gợi ý (có thể kiểm tra từ khóa tùy chọn) | Trung bình | Tránh lưu dữ liệu nhạy cảm không cần thiết |
| Mini-game | Ví dụ: memory card, game đơn giản 2D | Khó | Ưu tiên hiệu năng mobile |
| Truth/Dare (phiên bản frontend) | **Chỉ hiển thị gợi ý vui**, không yêu cầu upload ảnh qua app | Khó | Mọi hành động “gửi ảnh” là **ngoài phạm vi phần mềm** |

**Quy tắc không trùng lặp trong phiên:** Trong một phiên, ưu tiên **không lặp lại** cùng một `challengeId` cho đến khi đã duyệt hết tập khả dụng; sau đó **xáo trộn lại** và cho phép lặp (để vẫn đáp ứng “không giới hạn số lần từ chối”). Mâu thuẫn “vô tận” vs “không lặp” được xử lý bằng quy tắc này.

**Thời gian / độ khó:** Mỗi challenge có thể có **timebox**; có thể tăng dần theo chỉ số #X **nếu** được bật trong cấu hình (mặc định đề xuất: bật để tránh nhàm chán).

#### 2.2.6 Tùy chỉnh (Settings Modal)

- Tên người được hỏi, tên người hỏi (hoặc nhãn trung tính).  
- Ảnh / nền (theo khả năng lưu cục bộ).  
- Màu chủ đạo / palette.  
- Danh sách nhạc (URL hoặc file cục bộ tùy triển khai).  
- **Không** dùng mục “số challenge tối thiểu trước khi buông tha” nếu mâu thuẫn với luồng “chỉ kết thúc khi Có”. Nếu sản phẩm cần **chế độ tùy chọn** “cho phép thoát sau N lần / sau N challenge”, phải ghi rõ là **tùy chọn cấu hình (opt-in)** và **mặc định tắt** để khớp concept cốt lõi.

### 2.3 Đặc điểm người dùng

- **Người chơi:** không yêu cầu kỹ năng CNTT; font tối thiểu đọc được trên mobile; tránh phụ thuộc hoàn toàn vào màu sắc để truyền đạt thông tin.

### 2.4 Giả định, ràng buộc, rủi ro

| Mục | Nội dung |
|-----|----------|
| Trình duyệt | Chrome / Safari / Edge bản hiện đại; bật JavaScript. |
| Offline | Sau khi tải bundle, **có thể** hoạt động offline nếu triển khai service worker (PWA); media ngoài URL vẫn cần mạng. |
| Autoplay audio | Bị chặn nếu không có tương tác người dùng — cần UI “Bật nhạc”. |
| Quyền riêng tư URL | Query chứa tên/thông tin có thể lộ qua **lịch sử**, **referrer**, **log máy chủ** của bên host; nên hạn chế dữ liệu nhạy cảm hoặc dùng **hash** / rút gọn / mã hóa nhẹ (base64 URL-safe) khi cần. |
| Lưu trữ | LocalStorage giới hạn dung lượng; ảnh base64 lớn có thể fail — cần fallback (nén, giảm kích thước, hoặc chỉ URL). |

---

## 3. Yêu cầu cụ thể

### 3.1 Yêu cầu chức năng (Functional Requirements)

| ID | Mô tả | Tiêu chí chấp nhận (gợi ý) |
|----|--------|----------------------------|
| FR-01 | Cho phép tùy chỉnh thông tin cá nhân trước khi bắt đầu hoặc trong Settings. | Thay đổi tên/câu hỏi phản ánh trên Question & Celebration sau khi lưu. |
| FR-02 | Animation câu hỏi mượt trên thiết bị mục tiêu. | Trên máy tham chiếu (mid-range phone), không giật cục bộ đo bằng quan sát + DevTools FPS khi có tải hợp lý. |
| FR-03 | Nút “Không” có hiệu ứng né; **tùy chọn** hộp thoại xác nhận trong N lần đầu (N cấu hình, mặc định 0–5). | Người dùng vẫn có thể chọn “Không” sau xác nhận; không deadlock. |
| FR-04 | Khi chọn “Có”, chuyển sang Celebration trong **≤ 800 ms** (sau khi assets cần thiết đã có sẵn hoặc hiển thị skeleton). | Đo trên mạng LAN / local build. |
| FR-05 | Challenge Engine: random hoặc sequential theo config; **không trùng `challengeId` trong phiên** cho đến khi hết pool, sau đó xáo lại. | Kiểm thử với pool nhỏ: thứ tự không trùng cho đến khi vòng lặp pool. |
| FR-06 | Sau challenge, quay lại Question với **≥ 10 biến thể** câu hỏi (hoặc template + biến). | Không lặp cùng một câu liên tiếp nếu còn biến thể khác. |
| FR-07 | Lưu trạng thái: số lần từ chối, danh sách `challengeId` đã chơi, tiến độ tùy chỉnh — **LocalStorage và/hoặc IndexedDB**. | Refresh trang không mất trạng thái; có nút “Chơi lại”/reset rõ ràng. |
| FR-08 | PWA (nếu trong phạm vi phát hành): có manifest, service worker cache tài nguyên chính, có thể “Add to Home Screen”. | Lighthouse PWA checklist cơ bản (theo mục tiêu dự án). |
| FR-09 | Chia sẻ cấu hình qua URL: ví dụ `?name=...&theme=...` hoặc tương đương; parse an toàn khi thiếu/thừa tham số. | Không throw; fallback giá trị mặc định. |
| FR-10 | Import/export cấu hình (JSON) **khuyến nghị** để backup khi URL quá dài. | File JSON tái hiện được cùng trạng thái tùy chỉnh. |
| FR-11 | Xử lý lỗi lưu trữ: báo nhẹ nếu quota đầy; không crash app. | Thông báo UI; tắt tính năng cần lưu ảnh lớn nếu cần. |
| FR-12 | **Khả năng tiếp cận:** có `aria-label` / nhãn cho nút; không dùng màu làm tín hiệu duy nhất; tương phản đạt WCAG AA nếu có thể. | Kiểm tra nhanh bằng axe/Lighthouse accessibility. |

### 3.2 Yêu cầu phi chức năng (Non-functional)

| ID | Hạng mục | Yêu cầu |
|----|-----------|---------|
| NFR-01 | Hiện năng | **FCP** mục tiêu **< 1,5 s** trên mạng 4G và thiết bị tham chiếu; animation UI mục tiêu **~60 fps** khi không quá tải particle. |
| NFR-02 | Giao diện | Mobile-first; hỗ trợ **Light/Dark** nếu có trong scope; **font body ≥ 16px** trên mobile. |
| NFR-03 | Trải nghiệm | Mục tiêu định tính: phiên chơi đủ hấp dẫn; **không** dùng “điểm vui 9/10” làm yêu cầu kỹ thuật. Có thể đo proxy: **thời gian phiên trung bình** hoặc khảo sát sau pilot. |
| NFR-04 | Âm thanh | Không giả định autoplay thành công; luôn có điều khiển **bật/tắt** và icon trạng thái. |
| NFR-05 | Bảo mật / quyền riêng tư | Không gửi dữ liệu cá nhân lên server **trong phạm vi out-of-scope**; dữ liệu chỉ trên máy người dùng và URL do người dùng chia sẻ. |
| NFR-06 | Mở rộng | Thêm challenge mới chủ yếu qua **JSON / module đăng ký** không sửa core engine. |

**Công nghệ gợi ý (không ràng buộc SRS):** React + Vite hoặc Next.js (static export nếu không cần SSR); Tailwind CSS; Framer Motion; canvas-confetti; Howler.js; TypeScript.

### 3.3 Giao diện (UI/UX)

- **4 màn hình chính** + **1 modal Settings** (có thể tách Splash/Onboarding nếu đếm 5 màn — thống nhất trong wireframe).  
- Chuyển cảnh mượt; âm thanh phản hồi tùy chọn (click / success / fail) với điều khiển âm lượng hoặc tắt.  
- Wireframe chi tiết: bổ sung trong phiên bản tài liệu kèm hình hoặc link thiết kế.

### 3.4 Ma trận truy vết (Traceability) — gợi ý

| Nghiệp vụ (mục 2.2) | FR liên quan |
|---------------------|--------------|
| Question + Có/Không | FR-01, FR-02, FR-03, FR-04, FR-12 |
| Celebration | FR-01, FR-04, FR-07, FR-09 |
| Challenge loop | FR-05, FR-06, FR-07 |
| Chia sẻ / URL | FR-09, FR-10 |
| PWA / offline | FR-08, NFR-01 |

---

## 4. Kế hoạch triển khai gợi ý

| Phase | Nội dung | Thời gian gợi ý |
|-------|----------|-----------------|
| 1 | Core: Question + Celebration + Settings cơ bản | ~3 ngày |
| 2 | Challenge Engine + ≥ 10 thử thách đầu + luật không trùng pool | ~5 ngày |
| 3 | Mở rộng thử thách ≥ 20, PWA (nếu làm), animation polish, URL + import/export | ~4 ngày |
| 4 | Kiểm thử (thiết bị thật), a11y, hiệu năng, sửa lỗi | ~2 ngày |

---

## 5. Lịch sử phiên bản tài liệu

| Phiên bản | Ngày | Thay đổi chính |
|-----------|------|-----------------|
| 1.0 | 07/04/2026 | Bản nháp đầu |
| 1.1 | 08/04/2026 | Chuẩn hóa cấu trúc SRS; sửa bảng Challenge; giải quyết mâu thuẫn “vô hạn vs không lặp”; làm rõ autoplay, privacy URL, Truth/Dare; NFR đo được; bổ sung stakeholder, traceability, FR lỗi lưu trữ & a11y |
