// =============================================
// js/config.js
// Google Sheets CSV URL 設定
// 教練請將各工作表的 CSV 連結貼在這裡
// =============================================

const SHEET_URLS = {
  players:  '',   // 隊員名單
  coaches:  '',   // 教練團
  news:     '',   // 球隊公告
  calendar: '',   // 行事曆
  sponsors: '',   // 贊助芳名錄
  honors:   ''    // 榮譽榜
};

// ---- 網站基本資訊（可自行修改）----
const SITE_CONFIG = {
  teamName:    '台中市力行國小棒球隊',
  teamNameEn:  'LiSing Baseball',
  tagline:     '從基礎扎根，讓孩子在棒球中學會紀律、團隊與勇氣。',
  description: '這裡記錄孩子們的訓練、比賽、榮耀與成長，也感謝每一位支持力行少棒的家長、教練與贊助夥伴。',
  address:     '台中市南區力行路 ___號（請填入正確地址）',
  email:       '（請填入聯絡信箱）',
  facebook:    '#',   // Facebook 粉專網址
  instagram:   '#',   // Instagram 網址
  mapEmbed:    ''     // Google Map 嵌入網址
};
