import {
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  ETypeSortTable,
} from '@app/shared/constants/app.const';

export interface IValueFormatter {
  data: any;
}

export interface IImage {
  id?: number;
  src: string;
  width: number | string;
  height: number | string;
}

export interface IActionTable {
  data: any;
  label: string;
  icon: string;
  command: (...params: any[]) => any;
}

export interface IActionButtonTable {
  classButton?: string;
  styleClassButton?: string;
  label: string;
  icon: string;
  isDisabled?: boolean;
  showFunction?: (...params: any[]) => boolean;
  callBack: (...params: any[]) => any;
}

export interface IHeaderColumn {
  field: string;
  isSort?: boolean;
  fieldSort?: string;
  header: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  type?: ETypeDataTable;
  // isPin?: boolean;
  isResize?: boolean;
  class?: string;
  position?: number;
  posTextCell?: EPositionTextCell;
  isFrozen?: boolean;
  posFrozen?: EPositionFrozenCell;
  funcStyleClassStatus?: (...params: any[]) => string;
  funcLabelStatus?: (...params: any[]) => string;
  valueFormatter?: (...params: any[]) => any;
  valueGetter?: (...params: any[]) => any;
  isDefaultNotCutText?: boolean;
  hideBtnSetColumn?: boolean;
  hideDefault?: boolean; // ẩn mặc định
}

export interface ISortTable {
  field: string;
  type: ETypeSortTable;
  sort: string;
}

export interface IDropdown {
  label: string;
  value: number | string | boolean;
  severity?: string;
  rawData?: any;
}
