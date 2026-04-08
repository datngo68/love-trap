# Kế hoạch phát triển: Em Có Yêu Anh Không (SPA)

## Goal
Xây dựng ứng dụng web tương tác vui nhộn và lãng mạn, tập trung vào Frontend SPA. Người chơi chọn "Có" sẽ hiển thị màn hình chúc mừng, nếu chọn "Không" sẽ phải vượt qua chuỗi các thử thách (minigames, quiz) ngẫu nhiên cho tới khi chọn "Có".

## Project Type
WEB (React + Vite + TypeScript)

## Success Criteria
- Ứng dụng chạy mượt mà trên thiết bị di động (Mobile-first).
- Hỗ trợ đa ngôn ngữ (Vietnamese/English) từ đầu.
- Hệ thống Challenge Engine chạy mượt mà, nội dung thử thách (quiz, mini-game) phong phú.
- Hỗ trợ PWA (trong Phase 3).
- Lưu trạng thái cấu hình và tiến độ chơi thông qua URL / LocalStorage.

## Tech Stack
- **Framework:** React + Vite (Nhẹ, build siêu tốc, hoàn toàn tĩnh vì không cần server-side logic).
- **Language:** TypeScript (Type-safety cho cấu trúc cấu hình và challenge logic).
- **Styling:** Tailwind CSS (Nhanh, dễ dàng responsive mobile-first).
- **Animation:** Framer Motion (Cho hiệu ứng chuyển cảnh mềm mại và "ném" nút Không).
- **i18n:** `react-i18next` (Quản lý đa ngôn ngữ).
- **Utilities:** `canvas-confetti` (hiệu ứng ăn mừng), `howler` (audio).
- **State Management:** Zustand (Bởi vì cần state đơn giản để quản lý lịch sử thử thách đã qua).

## File Structure (Dự kiến)
```text
src/
├── assets/         # Images, Audio
├── components/     # UI Components (Buttons, Dialogs)
├── features/       # 
│   ├── challenges/ # Logic và data của các minigame/quiz
│   ├── question/   # Màn hình chính (Có/Không)
│   ├── settings/   # Cấu hình người dùng (Tên, màu, audio)
│   └── success/    # Màn hình chúc mừng
├── hooks/          # Custom hooks (Audio, LocalStorage)
├── i18n/           # Translation files (en, vi)
├── store/          # Zustand store (session progress)
├── types/          # TypeScript interfaces (ChallengeType, etc)
├── utils/          # URL generator, Hash encoder
└── App.tsx         # Main Routing (Step based)
```

## Task Breakdown

### Phase 1: Core Foundation (Question + Celebration + Settings + i18n)
- [x] Task 1 [agent: frontend-specialist]: Khởi tạo dự án `Vite + React + TS`, cấu trúc thư mục, và cài đặt `Tailwind CSS`, `Framer Motion`, `react-i18next`. → Verify: ✅ App chạy mượt tại localhost:5173.
- [x] Task 2 [agent: frontend-specialist, skill: i18n-localization]: Thiết lập cấu trúc i18n (tiếng Việt & tiếng Anh) với các text mặc định. → Verify: ✅ i18n hoạt động, đổi ngôn ngữ qua Settings.
- [x] Task 3 [agent: frontend-specialist, skill: frontend-design]: Xây dựng Layout cơ bản & SplashScreen. → Verify: ✅ Splash hiển thị đẹp với floating hearts.
- [x] Task 4 [agent: frontend-specialist, skill: frontend-design]: Xây dựng màn hình `QuestionScreen` tĩnh với nút "Có" và "Không". → Verify: ✅ UI chuẩn mobile-first.
- [x] Task 5 [agent: frontend-specialist]: Implement logic "né" (dodge) cho nút "Không" bằng Framer Motion. → Verify: ✅ Nút dodge + tooltip vui hoạt động.
- [x] Task 6 [agent: frontend-specialist]: Xây dựng màn hình `CelebrationScreen` với `canvas-confetti`. → Verify: ✅ Confetti burst + falling hearts.
- [x] Task 7 [agent: frontend-specialist]: Implement Modal Settings để chỉnh Tên và Ngôn ngữ, lưu vào LocalStorage. → Verify: ✅ Zustand persist hoạt động.

### Phase 2: Challenge Engine & 10 Thử Thách Đầu
- [x] Task 8 [agent: frontend-specialist]: Thiết kế kiến trúc `ChallengeEngine` (random thử thách không trùng). → Verify: ✅ Engine + Registry pattern hoạt động.
- [x] Task 9 [agent: frontend-specialist, skill: frontend-design]: Xây dựng component `ChallengeContainer` hỗ trợ render động UI các loại challenges. → Verify: ✅ Container render dynamic + Skip + Result flow.
- [x] Task 10 [agent: frontend-specialist]: Sáng tạo và code 5 thử thách dạng Quiz (Trắc nghiệm vui nhộn). → Verify: ✅ 5 quiz bilingual hoạt động.
- [x] Task 11 [agent: frontend-specialist]: Sáng tạo và code 5 thử thách tương tác (Mini-game click nhanh, memory, v.v..). → Verify: ✅ 5 games: ClickHearts, TapCounter, MemoryCards, CatchHearts, TypeLove.
- [x] Task 12 [agent: frontend-specialist, skill: i18n-localization]: Liên kết Question variants (biến thể câu hỏi sau mỗi lượt từ chối). → Verify: ✅ 12 biến thể câu hỏi xoay vòng.

### Phase 3: PWA, Đa dạng hoá, Tối ưu Animation và Chia sẻ URL
- [x] Task 13 [agent: frontend-specialist]: Bổ sung 10 thử thách mới (đạt tổng min 20+ bộ nội dung). → Verify: ✅ 20 challenges registered (10 quiz + 10 interactive).
- [x] Task 14 [agent: frontend-specialist]: Mã hoá trạng thái Settings thành Base64 URL (Query string). → Verify: ✅ encodeConfigToURL + decodeConfigFromURL hoạt động.
- [x] Task 15 [agent: frontend-specialist]: Thêm Audio Manager với UI điều khiển nhạc & SFX. → Verify: ✅ Music/SFX toggle + Howler.js integration.
- [x] Task 16 [agent: frontend-specialist]: Tích hợp PWA cấu hình Service Worker và Manifest. → Verify: ✅ manifest.json + sw.js + icons created.
- [x] Task 17 [agent: frontend-specialist, skill: performance-profiling]: Polish 60fps animations và transition toàn app. → Verify: ✅ SFX trên nút, spring physics, smooth transitions.

## Phase X: Verification Checklist
- [ ] Tính năng (Feature): Thử bấm N lần nút "Không", xác nhận game không bị deadend hay crash.
- [ ] Bảo mật (Security): Scan kiểm tra dependencies không có cảnh báo rủi ro cao.
- [ ] A11y (Accessibility): Quét độ tương phản trên UI đảm bảo nút màu không gây khó đọc.
- [ ] Build: Lệnh `npm run build` hoặc `tsc` chạy mượt không xuất lỗi Type.
- [ ] UX Audit: Audit theo frontend-design đảm bảo nút chạm lớn.
- [ ] SEO/PWA: Check Lighthouse Audit score >90 cho Performance & PWA.

## ✅ PHASE X COMPLETE
- Lint: [ ] Pass
- Security: [ ] No critical issues
- Build: [ ] Success
- Date: [Pending]
