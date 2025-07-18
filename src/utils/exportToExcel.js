import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportInvoicesToExcel(data, type = 'ALL') {
  const sheetData = [
    [
      "customer", "type", "number", "date", "due_date", "currency", "total",
      "item", "description", "quantity", "unit_cost", "discount", "tax", "shipping"
    ],
    ...data.map(inv => [
      inv.customer || '',
      inv.type || 'UNKNOWN',  // ✅ Fixed: fetch actual invoice type
      inv.number || '',
      inv.date || '',
      inv.due_date || '',
      inv.currency || '',
      inv.total || '',
      inv.item || '',
      inv.description || '',
      inv.quantity || '',
      inv.unit_cost || '',
      inv.discount || '',
      inv.tax || '',
      inv.shipping || ''
    ])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, `${type}_export.xlsx`);
}
