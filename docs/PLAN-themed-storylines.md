# PLAN: Themed Storylines for Heart Journey

> **Feature:** Hệ thống kịch bản (Storylines) ngẫu nhiên cho màn hình Heart Journey.
> **Agent:** `project-planner`

---

## 🎯 Mục Tiêu
Thay thế 3 màn chơi cố định hiện tại thành hệ thống **"Combo Kịch Bản" (Themed Storylines)**. Khi người dùng bấm "CÓ", hệ thống sẽ chọn ngẫu nhiên 1 trong 4 kịch bản khác nhau, với mỗi kịch bản mang một thông điệp và cảm xúc riêng biệt. Tận dụng toàn bộ kho tàng 20+ game hiện có!

## 🧩 Các Kịch Bản (Themed Combos)

1. **Combo 1: 🌹 Lãng Mạn Tuyệt Đối (Romantic)**
   - *Bước 1:* Bó Hoa Tình Yêu (`bouquet-builder-1`)
   - *Bước 2:* Lời Yêu Thương (`mad-libs-1`)
   - *Bước 3:* Vẽ Lên Tình Yêu (`draw-heart-1`)

2. **Combo 2: ⚡ Thử Thách Cực Độ (Action/Reflex)**
   - *Bước 1:* Bắt Tim Yêu (`catch-hearts-1`)
   - *Bước 2:* Nhịp Yêu (`rhythm-tap-1`)
   - *Bước 3:* Bắn Tim Yêu (`heart-shooter-1`)

3. **Combo 3: 💭 Miền Ký Ức (Memory & Truth)**
   - *Bước 1:* Câu Hỏi Tình Yêu (`quiz-1`)
   - *Bước 2:* Thật Hay Thách (`truth-dare-1`)
   - *Bước 3:* Kỷ Niệm Yêu (`memory-lane-1`)

4. **Combo 4: 🎈 Vui Nhộn & Bất Ngờ (Fun)**
   - *Bước 1:* Đếm Tim Nhịp Nhàng (`tap-counter-1`)
   - *Bước 2:* Lật Thẻ Bài (`memory-cards-1`)
   - *Bước 3:* Đuổi Bắt Tình Yêu (`click-hearts-1`)

---

## 📋 Task Breakdown

### TASK 1: Refactor `journeyData.ts`
- Đổi export tĩnh `journeySteps` thành array chứa **các kịch bản (Themes)**: `themedJourneys`. Mỗi theme chứa mảng 3 `challengeId`.
- Tạo function `getRandomJourney()`: tự động pick 1 combo random từ `themedJourneys` và map ra mảng `JourneyStepDef` hợp lệ với UI hiện tại.

### TASK 2: Update Data Model cho StepDef
- Update `JourneyStepDef` để không hardcode title/desc nữa. Lấy thẳng `titleKey` và `descriptionKey` từ `ChallengeDefinition` trong Registry. Nhờ vậy app sẽ hoàn toàn dynamic dựa theo data gốc của mini-game.

### TASK 3: Update `HeartJourneyScreen.tsx`
- Giờ đây ta sẽ thay import tĩnh `journeySteps` thành logic `useMemo`: `const journeySteps = useMemo(() => getRandomJourney(), [])`.

### TASK 4: Verification & Test
- Build TS không lỗi (`npm run build`).
