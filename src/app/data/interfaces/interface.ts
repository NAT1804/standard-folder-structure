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
  fieldStatus?: IStatusHeaderColumn;
  funcStyleClassStatus?: (...params: any[]) => string;
  funcLabelStatus?: (...params: any[]) => string;
  valueFormatter?: (...params: any[]) => any;
  valueGetter?: (...params: any[]) => any;
  isDefaultNotCutText?: boolean;
  hideBtnSetColumn?: boolean;
  hideDefault?: boolean; // ẩn mặc định
}

export interface IStatusHeaderColumn {
  fieldLabel: string;
  fieldSeverity: string;
}

export interface ISortTable {
  field: string;
  type: ETypeSortTable;
}

export interface IDropdown {
  label: string;
  value: number | string | boolean;
  severity?: string;
  rawData?: any;
}

export interface DropdownDTO {
  name: string;
  value: number | string | boolean;
  rawData?: any;
}

export interface ITabView {
  key: string;
  title: string;
  component: any;
  isDisabled: boolean;
  isHide?: boolean;
}

export interface IActionButtonDialog {
  label: string;
  callBack: (...params: any[]) => void;
}

export interface ICloseDialog {
  status: boolean;
  message?: string;
}
