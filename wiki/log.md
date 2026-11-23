# Git 教學 Wiki 維護紀錄

## [2026-11-23] ingest | 五份 Git 教學 PDF

- 在 `raw/papers/` 保存使用者交付的五份 PDF。保留原始檔名，逐份比對 SHA-256。來源頁列出各份 PDF 的頁數、相關章節與教材用法。[來源索引](sources/index.md)
- 建立零基礎學習路徑，整合本機操作、遠端與 GitHub Pull Request 實作，並補充不同來源在終端機、預設分支與 `git pull` 行為上的差異。[學習路徑](index.md)
- Windows PowerShell 使用 Git 2.45.1.windows.1 驗證提交身分設定、暫存與差異、建立分支、快轉合併，以及一次衝突和解決流程。用本機裸儲存庫驗證複製、推送、上游追蹤與比較分支的預期差異。
- GitHub 網頁的儲存庫建立與 PR 操作依官方文件核對。驗證範圍為文件比對，實際 GitHub 登入和開 PR 待讀者完成。[建立儲存庫](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) · [建立 Pull Request](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request)

## [2026-11-23] update | Git 教學 HTML 簡報

- 將學習路徑改編成 12 張可在本機瀏覽的投影片，並沿用共用像素貼圖。簡報提供章節跳轉、鍵盤翻頁與 PowerShell 指令複製。[HTML 簡報](../slides/index.html)

## [2026-11-23] update | Graph 課程地圖與提交圖

- 封面加入七個可點選的課程節點，標明本機練習與 GitHub PR 實作的儲存庫切換。加入兩張可切換前後狀態的提交圖，說明快轉與衝突解決後的分支指向，並在 PR 頁呈現來源和目標分支。
- 在 Chrome 驗證 14 張投影片的順序、七個節點的跳轉、提交圖的狀態切換和手機版面。[Graph 簡報](../slides/index.html)
