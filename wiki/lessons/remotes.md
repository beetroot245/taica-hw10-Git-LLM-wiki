# 遠端儲存庫

本機的提交會先留在你的電腦上。當你想從另一台電腦取得專案或和別人分享提交，可以使用遠端（remote）。下一個練習使用 GitHub 託管自己的遠端儲存庫。[Pro Git 遠端儲存庫](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)

| 指令 | 用途 |
| --- | --- |
| `git clone` | 複製現有儲存庫到本機，通常會把來源記為 `origin`。 |
| `git remote -v` | 列出遠端的名稱與網址。 |
| `git fetch origin` | 從 `origin` 取得更新並更新遠端追蹤分支，例如 `origin/main`。目前分支和工作檔案會維持原狀。 |
| `git pull` | 抓取之後整合到目前分支。整合方式受參數或設定影響。 |
| `git push -u origin practice/add-notes` | 推送本機的練習分支，成功時同時設定上游追蹤。 |

在下一頁複製自己的 GitHub 練習儲存庫後，先在 PowerShell 執行 `git remote -v`，核對 `origin` 指向剛建立的儲存庫。若沒有輸出，確認你已進入複製後的資料夾。`git branch --show-current` 顯示的是當前本機分支，剛複製時可用它確認遠端預設分支在本機的名稱。

教材來源：[S01 第 4–5 頁](../sources/index.md#s01)、[S02 第 6 頁](../sources/index.md#s02)、[S03 第 7–8 頁](../sources/index.md#s03)、[S05 第 9–14 頁](../sources/index.md#s05)。

下一步：[開出第一個 GitHub Pull Request](../exercises/first-pull-request.md)。
