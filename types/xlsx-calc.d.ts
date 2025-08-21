declare module 'xlsx-calc' {
  import type { WorkBook } from 'xlsx';

  // The module exports a single function
  export default function recalc(workbook: WorkBook): void;
}
