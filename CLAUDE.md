# 失物招領處：霧埔站的最後一週

繁體中文的海龜湯推理小遊戲。玩家是車站失物招領處的夜班職員，七個晚上，每晚一碗湯：有人拿著失物做了怪事，玩家問站長是非題、拼出湯底。完整企劃在 `DESIGN.md`，動手前先讀。

預計技術：React 18 + TypeScript + Vite。引擎是純函式（`src/engine/`），每晚的物品、客人、對話是資料（`src/content/`）。部署到 GitHub Pages。

## 固定規矩

- 回覆使用者一律用繁體中文。
- 所有人名、地名、物品、文字都要原創，不借用現有作品。
- commit 訊息用繁體中文。每做完一個功能就 commit 並 push 到 `main`（https://github.com/Raythomas4721/LostAndFound ，會自動部署到 GitHub Pages）。
- 測試從簡：`npx tsc --noEmit -p .`、`npm run validate`、`npx vitest run`、`npm run simulate -- --runs 300`。
- 不要安裝外部的 skill 或 plugin。
- 目標是第一輪就好玩、容易走完；不會 game over，還錯東西只會讓故事轉彎。

## 謎題規則（改內容時一定要守）

- 每碗湯都要通過 `npm run validate`：推理板的答案都問得到；最少題數在範圍內（第一碗 4–8 題，之後 ≤ 12）且不能是 0；每個空格的類別至少有 3 個拿得到的線索詞（要有誘餌）。
- 回答「不重要」的題目不能解鎖線索詞。溫伯說謊（`hesitant`）只能用在大湯。
- 主線段落固定寫在某一晚，不用機率觸發。
- 每個湯底都要有轉折；只是把湯面講得更詳細的不算。
