export interface TableOptions {
  path: string;
  title?: string;
  dialogSize?: number;
  pagination?: boolean;
  dialogComponent?: any;
  columns?: TableColumn[];
  columnChooserSize?: number;
  showRankingBtn?: boolean;
  showDownladPdfOrDoc?: boolean;
  showRowN?: boolean;
  showApplyButton?: boolean;
  filterColumn?: string;
}
export interface TableColumn {
  type: string;
  name: string;
  label?: string;
  width?: number;
  visible?: boolean;
}
