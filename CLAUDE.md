# 深夜湯館

繁體中文的海龜湯推理小遊戲合集。首頁是一排湯本，每本是一條獨立主線：每晚一碗湯，玩家問主持人是非題、拼出湯底，最後一晚喝完大湯。目前有三本：《失物招領處：霧埔站的最後一週》（溫馨）、《凌晨三點的電台》（怪奇）、《斷橋民宿》（驚悚）、《最後一屆》（恐怖）。完整企劃在 `DESIGN.md`（最後的〈深夜湯館〉一節講多湯本結構），動手前先讀。

預計技術：React 18 + TypeScript + Vite。引擎是純函式（`src/engine/`），湯本是資料：每本放在 `src/content/<湯本>/`，在 `src/content/stories.ts` 登記。介面上跟著湯本換的字（主持人、提示、證物欄）放在 `Story.voice`，不要寫死在 UI 裡。部署到 GitHub Pages。

## 固定規矩

- 回覆使用者一律用繁體中文。
- 所有人名、地名、物品、文字都要原創，不借用現有作品。
- commit 訊息用繁體中文。每做完一個功能就 commit 並 push 到 `main`（https://github.com/Raythomas4721/LostAndFound ，會自動部署到 GitHub Pages）。
- 測試從簡：`npx tsc --noEmit -p .`、`npm run validate`、`npx vitest run`、`npm run simulate -- --runs 300`。
- 不要安裝外部的 skill 或 plugin。
- 目標是第一輪就好玩、容易走完；不會 game over，還錯東西只會讓故事轉彎。

## 謎題規則（改內容時一定要守）

- 每一本湯本都要通過驗證；新湯本的存檔 key 不能跟別本重複，失物招領處的 `lostandfound.save.v1` 不能改。
- 每碗湯都要通過 `npm run validate`：推理板的答案都問得到；最少題數在範圍內（第一碗 4–8 題，之後 ≤ 12）且不能是 0；每個空格的類別至少有 3 個拿得到的線索詞（要有誘餌）。
- 回答「不重要」的題目不能解鎖線索詞。溫伯說謊（`hesitant`）只能用在大湯。
- 主線段落固定寫在某一晚，不用機率觸發。
- 每個湯底都要有轉折；只是把湯面講得更詳細的不算。
