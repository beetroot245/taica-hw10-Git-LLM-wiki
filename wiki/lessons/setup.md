# 安裝與設定 Git

你需要一台 Windows 電腦。Git 記錄專案的版本，GitHub 提供遠端儲存庫和 Pull Request。你可以先完成本機練習，再登入 GitHub 做期末實作。

## Windows PowerShell

安裝 Git for Windows 後，開一個新的 PowerShell 視窗，確認下列命令有印出版本。安裝時保留從命令列使用 Git 與 Git Credential Manager 的選項。[Git for Windows 官方安裝頁](https://git-scm.com/install/windows)

~~~powershell
git --version
~~~

設定每次提交會記錄的姓名與電子郵件。下方會提示你輸入資料，`--global` 讓設定套用到這個 Windows 使用者的各個儲存庫。已設定過的讀者可以直接執行最後兩行檢查。希望在 GitHub 隱藏私人信箱時，可使用 GitHub 帳號電子郵件設定顯示的 noreply 地址。[Pro Git 初次設定](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)

~~~powershell
git config --global user.name (Read-Host 'Commit name')
git config --global user.email (Read-Host 'Commit email')
git config --global --get user.name
git config --global --get user.email
~~~

若 PowerShell 找不到 `git`，先關閉舊視窗並重開，再檢查安裝是否讓命令列可以使用 Git。

## GitHub 網頁

在 GitHub 註冊或登入，準備使用自己的帳號建立練習儲存庫。推送時若 Git Credential Manager 開啟登入頁，依提示授權。PowerShell 裡設定的姓名與信箱會寫入提交，GitHub 登入則用來授權對遠端儲存庫的操作。[GitHub 的 HTTPS 認證說明](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git)

教材來源：[S01 第 2–3 頁](../sources/index.md#s01)、[S02 第 3–4 頁](../sources/index.md#s02)。

下一步：[工作目錄、暫存區與提交](local-workflow.md)。
