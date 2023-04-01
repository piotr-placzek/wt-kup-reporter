import * as XLSX from 'xlsx-js-style';

export function mergeWorkSheets(sheets: XLSX.WorkSheet[]): XLSX.WorkSheet {
  const ws = sheets.reduce((ws: XLSX.WorkSheet, cws: XLSX.WorkSheet) => ({ ...ws, ...cws }), {});
  return ws;
}
