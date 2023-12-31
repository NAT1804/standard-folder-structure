export const DEFAULT_WIDTH = 100;
export const DEFAULT_HEIGHT = 100;
export enum ETypeDataTable {
  INDEX = 1,
  TEXT = 2,
  ACTION_BUTTON = 3,
  STATUS = 4,
  ACTION = 5,
  CHECK_BOX = 6,
  SELECT_CHECK_BOX = 7,
  COUNT_DOWN_TIME = 8,
}
export enum EPositionTextCell {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}
export enum EPositionFrozenCell {
  LEFT = 'left',
  RIGHT = 'right',
}
export enum ETypeSortTable {
  ASC = 'asc',
  DESC = 'desc',
}
export const EColumnResizeMode = {
  FIT: 'fit',
  EXPAND: 'expand',
};
export const SEVERITY = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  WARNING: 'warning',
  SUCCESS: 'success',
  DANGER: 'danger',
  INFO: 'info',
};
export enum ETypeStatus {
  SEVERITY = 'severity',
  LABEL = 'label',
}
export enum ETypeConfirm {
  ACCEPT = 'accept',
  REJECT = 'reject',
}
export enum ESelectionModeCalendar {
  MULTIPLE = 'multiple',
  RANGE = 'range',
  SINGLE = 'single',
}
export const COMPARE_TYPE = {
  EQUAL: 1,
  GREATER: 2,
  LESS: 3,
  GREATER_EQUAL: 4,
  LESS_EQUAL: 5,
};
