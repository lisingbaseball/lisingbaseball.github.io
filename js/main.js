// =============================================
// js/main.js
// 共用工具、導覽列互動
// =============================================

// ---- 漢堡選單 ----
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (btn && mobileNav) {
    btn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // 目前頁面 active
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, #mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // 填入網站名稱
  if (typeof SITE_CONFIG !== 'undefined') {
    document.querySelectorAll('.site-name').forEach(el => el.textContent = SITE_CONFIG.teamName);
    document.querySelectorAll('.site-name-en').forEach(el => el.textContent = SITE_CONFIG.teamNameEn);
  }
});

// ---- 日期格式化 ----
function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  if (isNaN(d)) return str;
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
}

function getMonthDay(str) {
  if (!str) return { m: '--', d: '--' };
  const d = new Date(str);
  if (isNaN(d)) {
    const parts = str.split(/[-\/]/);
    return { m: parts[1] || '--', d: parts[2] || '--' };
  }
  return { m: String(d.getMonth()+1).padStart(2,'0'), d: String(d.getDate()).padStart(2,'0') };
}

// ---- 生成頭像縮寫 ----
function avatarInitials(name) {
  if (!name) return '?';
  return name.slice(0, 1);
}

// ---- 頁面通用 header/footer 注入 ----
function buildNav() {
  const pages = [
    { href: 'index.html',    label: '首頁' },
    { href: 'about.html',    label: '關於球隊' },
    { href: 'players.html',  label: '隊員介紹' },
    { href: 'coaches.html',  label: '教練團' },
    { href: 'news.html',     label: '球隊公告' },
    { href: 'calendar.html', label: '行事曆' },
    { href: 'honors.html',   label: '榮譽榜' },
    { href: 'sponsors.html', label: '贊助芳名錄' },
    { href: 'contact.html',  label: '聯絡我們' },
  ];
  return pages.map(p => `<a href="${p.href}">${p.label}</a>`).join('');
}
