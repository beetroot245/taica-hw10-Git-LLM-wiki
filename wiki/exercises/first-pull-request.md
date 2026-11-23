# 實作：開出第一個 GitHub Pull Request

你會在自己的練習儲存庫提出一個變更。完成標準是獨立建立分支、提交變更、推送分支，並在 GitHub 開出狀態為 `Open` 的 Pull Request（PR），核對來源分支、目標分支和檔案差異。先完成[安裝與設定](../lessons/setup.md)，並登入 GitHub。

## 1. GitHub 網頁 · 建立練習儲存庫

從 GitHub 的新增選單選擇 `New repository`，在個人帳號下建立名為 `git-pr-practice` 的儲存庫。可設為私人（`Private`）。勾選加入 README，讓預設分支先有一筆提交。建立後，在儲存庫的 `Code` 選單複製 HTTPS 網址。[GitHub 建立儲存庫說明](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)

## 2. Windows PowerShell · 複製並建立分支

在可以建立新資料夾的位置操作。第一行會請你貼上剛複製的網址，接著進入 `git-pr-practice`。記下 `git branch --show-current` 印出的預設分支，稍後會用在 PR。

~~~powershell
$repoUrl = Read-Host 'GitHub HTTPS URL'
git clone $repoUrl git-pr-practice
Set-Location git-pr-practice
git remote -v
git branch --show-current
~~~

確認 `origin` 是自己的練習儲存庫後，建立新分支。確認畫面印出 `practice/add-notes`。

~~~powershell
git switch -c practice/add-notes
git branch --show-current
~~~

## 3. Windows PowerShell · 提交並推送

用一份新的文字檔記錄練習成果。在提交前，用 `git diff --staged` 核對即將提交的內容。

~~~powershell
Set-Content -LiteralPath notes.txt -Value 'I created my first pull request.'
git add -- notes.txt
git --no-pager diff --staged -- notes.txt
git commit -m "Add first PR practice notes"
git push -u origin practice/add-notes
git status --short --branch
~~~

推送成功後，狀態應顯示目前分支追蹤 `origin/practice/add-notes`。若推送時開啟認證頁面，使用有權存取該儲存庫的 GitHub 帳號完成登入。認證失敗時，先核對 `origin` 指向哪個帳號底下的儲存庫，再依官方認證說明檢查登入。[GitHub 的 HTTPS 認證說明](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git)

## 4. GitHub 網頁 · 開啟 PR 並驗收

1. 回到練習儲存庫，若看到 `Compare & pull request`，就點選它。也可以從 `Pull requests` 頁籤選 `New pull request`。
2. 將 `base` 設為剛才記下的預設分支，例如 `main`。將 `compare` 設為 `practice/add-notes`。
3. 檢查差異中只有預期新增的 `notes.txt`，填寫標題與簡短說明，再選 `Create pull request`。
4. 確認 PR 狀態是 `Open`，目標和來源分支正確，並在 `Files changed` 看見 `notes.txt`。保留 PR 網址作為練習結果。到這一步就完成驗收。

若比較頁看不到差異，核對來源與目標是否選成相同分支，並確認推送成功、提交出現在遠端練習分支。[GitHub 建立 Pull Request 說明](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request)

教材來源：[S02 第 8 頁](../sources/index.md#s02)、[S03 第 15 頁](../sources/index.md#s03)。

[回學習路徑](../index.md)
