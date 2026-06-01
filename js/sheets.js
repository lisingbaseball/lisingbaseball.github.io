// =============================================
// js/sheets.js
// Google Sheets CSV 讀取與解析
// =============================================

/**
 * 穩健的 CSV 解析器
 * 支援欄位內含逗號（雙引號包覆）及換行
 */
function parseCSV(text) {
  const rows = [];
  let i = 0;
  const len = text.length;

  while (i < len) {
    const row = [];
    // skip \r\n at start of row
    while (i < len && (text[i] === '\r' || text[i] === '\n')) i++;
    if (i >= len) break;

    while (i < len) {
      if (text[i] === '"') {
        // quoted field
        i++; // skip opening "
        let field = '';
        while (i < len) {
          if (text[i] === '"') {
            if (text[i + 1] === '"') { field += '"'; i += 2; } // escaped "
            else { i++; break; } // closing "
          } else {
            field += text[i++];
          }
        }
        row.push(field);
      } else {
        // unquoted field
        let field = '';
        while (i < len && text[i] !== ',' && text[i] !== '\r' && text[i] !== '\n') {
          field += text[i++];
        }
        row.push(field.trim());
      }
      if (i < len && text[i] === ',') { i++; } // skip comma
      else break; // end of row
    }
    if (row.length > 0 && !(row.length === 1 && row[0] === '')) {
      rows.push(row);
    }
  }
  return rows;
}

/**
 * 將 CSV 陣列轉成物件陣列（第一列為 header）
 */
function csvToObjects(rows) {
  if (!rows || rows.length < 2) return [];
  const headers = rows[0].map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (row[i] || '').trim(); });
    return obj;
  });
}

/**
 * 從 Google Sheets CSV URL 讀取資料
 * 若 URL 未設定，回傳 null（不報錯）
 */
async function fetchSheet(sheetKey) {
  const url = SHEET_URLS[sheetKey];
  if (!url || url.trim() === '') return null;
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const text = await res.text();
    const rows = parseCSV(text);
    return csvToObjects(rows);
  } catch (e) {
    console.warn('無法載入資料表:', sheetKey, e);
    return null;
  }
}

/**
 * 顯示載入中
 */
function showLoading(container) {
  container.innerHTML = `<div class="loading-box"><div class="spinner"></div>資料載入中…</div>`;
}

/**
 * 顯示「資料整理中」（URL 未設定時）
 */
function showPending(container, label) {
  container.innerHTML = `<div class="empty-box">⚾ ${label || '資料'}整理中，敬請期待。</div>`;
}

/**
 * 顯示空白提示
 */
function showEmpty(container, msg) {
  container.innerHTML = `<div class="empty-box">${msg || '目前尚無資料。'}</div>`;
}
