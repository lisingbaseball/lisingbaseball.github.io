# 台中市力行國小棒球隊 LiSing Baseball

官方網站：**https://lisingbaseball.github.io/**

---

## 🔧 網站架構

純靜態網站（HTML + CSS + JS），免費架設於 GitHub Pages。
所有動態資料（隊員、公告、行事曆等）從 **Google Sheets** 讀取，教練只要修改 Google Sheets 即可更新網站。

---

## 📋 第一步：建立 Google Sheets

### 1. 建立新 Google 試算表

前往 [sheets.google.com](https://sheets.google.com) 新增一個試算表，
建議命名為「**力行棒球隊官網資料**」。

### 2. 建立六個工作表，欄位如下：

#### 工作表：players（隊員名單）
```
name	photo_url
```
> - name：姓名（請確認已取得家長同意）
> - photo_url：照片網址（可空白；空白時自動顯示預設圖片）

#### 工作表：coaches（教練團）
```
name	title	license	intro	photo_url
```
> - name：姓名
> - title：職稱（如 主任教練、助理教練）
> - license：證照/資歷（如 中華民國棒球協會C級教練）
> - intro：簡介
> - photo_url：照片網址（可空白）

#### 工作表：news（球隊公告）
```
date	title	content	category	pinned
```
> - date：日期（格式 2025-04-01）
> - title：標題
> - content：內容（可換行）
> - category：類別（如 訓練通知、賽事資訊）
> - pinned：是否置頂（填 true 或 false）

#### 工作表：honors（榮譽榜）
```
year	event	result	note
```
> - year：年度（如 2024）
> - event：賽事名稱
> - result：成績（如 冠軍、季軍）
> - note：備註

---

## 🔗 第二步：取得 CSV 連結並貼入網站

每個工作表需個別發布：

1. 打開 Google Sheets
2. 選擇要發布的工作表（如 players）
3. 點選上方選單：**檔案 → 發布到網路**
4. 選擇該工作表 → 格式選 **逗號分隔值 (.csv)**
5. 按下「發布」，複製網址
6. 重複以上步驟給每個工作表

取得六個 CSV 網址後，打開 `js/config.js`，將網址填入：

```javascript
const SHEET_URLS = {
  players:  'https://docs.google.com/spreadsheets/d/xxx/pub?gid=xxx&single=true&output=csv',
  coaches:  'https://docs.google.com/spreadsheets/d/xxx/pub?gid=xxx&single=true&output=csv',
  news:     'https://docs.google.com/spreadsheets/d/xxx/pub?gid=xxx&single=true&output=csv',
  honors:   'https://docs.google.com/spreadsheets/d/xxx/pub?gid=xxx&single=true&output=csv'
};
```

---

## ✏️ 日常更新操作

### 如何更新公告
1. 打開 Google Sheets → news 工作表
2. 新增一列，填入 date / title / content / category / pinned
3. 存檔（自動更新）→ 約 5 分鐘後網站生效

### 如何更新隊員介紹
1. 打開 Google Sheets → players 工作表
2. 新增或修改隊員資料
3. ⚠️ 請確認已取得家長書面同意後再填入姓名與照片

### 如何更新教練團
1. 打開 Google Sheets → coaches 工作表
2. 修改或新增教練資料

### 如何更新榮譽榜
1. 打開 Google Sheets → honors 工作表
2. 新增年度榮譽記錄

---

## 🖼️ 如何更換 LOGO

1. 將新 LOGO 圖片（建議 80×80 px，SVG 或 PNG）放入 `assets/` 目錄
2. 打開所有 HTML 檔案，將 `assets/logo-placeholder.svg` 替換為新檔名
3. Push 到 GitHub 即生效

---

## 📝 如何更換首頁文字

打開 `js/config.js`，修改 `SITE_CONFIG` 內的欄位：

```javascript
const SITE_CONFIG = {
  teamName:    '台中市力行國小棒球隊',
  tagline:     '從基礎扎根，讓孩子在棒球中學會紀律、團隊與勇氣。',
  description: '這裡記錄...',
  address:     '台中市南區力行路 ___號',
  email:       'xxx@yyy.edu.tw',
  facebook:    'https://www.facebook.com/...',
  instagram:   'https://www.instagram.com/...',
  mapEmbed:    'https://www.google.com/maps/embed?...'
};
```

---

## 🚀 如何部署到 GitHub Pages

### 初次建立

```bash
# 1. 初始化 git
cd lisingbaseball
git init
git add .
git commit -m "初始化力行棒球官網"

# 2. 登入 GitHub CLI（第一次需要）
gh auth login

# 3. 建立 GitHub Repository（注意：帳號名稱必須是 lisingbaseball）
gh repo create lisingbaseball.github.io --public --source=. --push

# 4. 啟用 GitHub Pages（設為 main branch 根目錄）
gh api repos/lisingbaseball/lisingbaseball.github.io/pages \
  --method POST \
  --field source[branch]=main \
  --field source[path]=/
```

### 之後每次更新

```bash
git add .
git commit -m "更新網站內容"
git push
```

約 1~2 分鐘後，網站自動更新。

---

## ⚠️ 兒童個資與照片使用提醒

- **刊登姓名前**：請確認已取得家長書面同意
- **刊登照片前**：請確認已取得家長書面同意，且照片中未包含其他未同意的孩童
- **禁止公開**：生日、住址、電話、身分證字號、家長姓名與聯絡方式
- **若家長撤回同意**：請立即從 Google Sheets 刪除該筆資料

建議每學年初請家長簽署「網站公開同意書」，並妥善保存。

---

## ✅ 完成後只需要做 3 件事

1. **建立 Google Sheets** 並填入資料（依照上方欄位說明）
2. **取得 CSV 連結**，貼入 `js/config.js`，push 到 GitHub
3. **把網址分享給家長**：https://lisingbaseball.github.io/

---

*本網站由 GitHub Pages 免費架設，無任何後端伺服器或資料庫費用。*
