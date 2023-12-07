import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  IActionButtonTable,
  IActionTable,
  IHeaderColumn,
  IImage,
  ISortTable,
} from '@app/data/interfaces/interface';
import { Page } from '@app/data/model/page';
import {
  EColumnResizeMode,
  EPositionFrozenCell,
  EPositionTextCell,
  ETypeDataTable,
  ETypeSortTable,
} from '@app/shared/constants/app.const';
import { BaseCommonComponent } from '../base-common-component/base-common-component.component';

@Component({
  selector: 'emir-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.scss'],
})
export class FormTableComponent
  extends BaseCommonComponent
  implements OnChanges
{
  @Input()
  public columns: IHeaderColumn[] = [];
  @Input()
  public dataSource: any[] = [];
  @Input()
  public isLoading = Boolean(false);
  @Input()
  public rowHover = Boolean(true);
  @Input()
  public showCurrentPageReport = Boolean(true);
  @Input()
  public showPaginator = Boolean(true);
  @Input()
  public responsiveLayout = String('scroll');
  @Input()
  public dataKey = String('id');
  @Input()
  public resizableColumns = Boolean(false);
  @Input()
  public columnResizeMode: string = EColumnResizeMode.EXPAND;
  @Input()
  public scrollable = Boolean(true);
  @Input()
  public scrollHeight: string;
  @Input()
  public styleClass = String('');
  @Input()
  public actionButtons: IActionButtonTable[] = [];
  @Input()
  public listAction: IActionTable[][] = [];
  @Input()
  public showAction = Boolean(true);
  @Input()
  public page: Page = new Page();
  @Input()
  public selectedData: any[] = [];
  @Input()
  public hideDivHeader = Boolean(true);
  @Output()
  public _setColumn: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public _changePage: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public selectedDataChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output()
  public _onSort: EventEmitter<ISortTable> = new EventEmitter<ISortTable>();
  @Output()
  public pageChange: EventEmitter<Page> = new EventEmitter<Page>();

  constructor(public changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  public get ETypeDataTable() {
    return ETypeDataTable;
  }

  public get EPositionTextCell() {
    return EPositionTextCell;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.changeDetectorRef.detectChanges();
      this.changeDetectorRef.markForCheck();
    }
  }

  public isGetShowButton = (
    data: any,
    action: IActionButtonTable,
    index: number,
    col: IHeaderColumn
  ) => {
    if (action.showFunction) {
      return action.showFunction(data, action, index, col);
    }
    return true;
  };

  public handleClickButton(
    data: any,
    action: IActionButtonTable,
    index: number
  ) {
    if (action.callBack) {
      action.callBack(data, index);
    }
  }

  public getStatus(row: any, key: string, col: IHeaderColumn) {
    if (key === 'style') {
      if (col.fieldStatus) {
        return row[col.fieldStatus.fieldSeverity];
      }
      return col.funcStyleClassStatus
        ? col.funcStyleClassStatus(row.status)
        : undefined;
    } else if (key === 'label') {
      if (col.fieldStatus) {
        return row[col.fieldStatus.fieldLabel];
      }
      return col.funcLabelStatus ? col.funcLabelStatus(row.status) : undefined;
    }
    return undefined;
  }

  public setColumn(event: any) {
    if (event) {
      this._setColumn.emit(event);
    }
  }

  public handleChangePage(event: any) {
    if (event) {
      this.page.pageNumber = event.page;
      this.page.pageSize = event.rows;
      this._changePage.emit(this.page);
      this.pageChange.emit(this.page);
    }
  }

  public getRightColCss(index: number) {
    if (
      this.columns[index].isFrozen &&
      this.columns[index].posFrozen === EPositionFrozenCell.RIGHT
    ) {
      let res = String('0px');
      for (let i = index + 1; i < this.columns.length; i++) {
        if (
          this.columns[i].isFrozen &&
          this.columns[i].posFrozen === EPositionFrozenCell.RIGHT
        ) {
          res += ` + ${this.columns[i].width}`;
        }
      }
      return `calc(${res})`;
    }
    return undefined;
  }

  public selectionChange(event: any) {
    if (event) {
      this.selectedDataChange.emit(this.selectedData);
    }
  }

  public getFieldSort(col: IHeaderColumn) {
    if (!col.isSort) {
      return '';
    }
    return col.fieldSort || col.field;
  }

  public handleSort(event: any) {
    if (event && !!event.sortField) {
      const typeSort =
        event.sortOrder === 1 ? ETypeSortTable.ASC : ETypeSortTable.DESC;
      this._onSort.emit({
        field: event.sortField,
        type: typeSort,
      } as ISortTable);
    }
  }

  public getWidth(key: string, col: IHeaderColumn) {
    if (key === 'width') {
      return col.width && col.width.length ? col.width : '';
    }
    const keyWidth = key + 'Width';
    return col ? col[keyWidth as keyof IHeaderColumn] : '';
  }

  public get emptyDataTable() {
    return {
      src: 'assets/layout/images/empty-data-table-icon.svg',
      width: 32,
      height: 32,
    } as IImage;
  }

  public get RESIZE_COLUMN() {
    return 'assets/layout/images/icon-resize-column.png';
  }

  public showImage(row: any, col: IHeaderColumn) {
    return !!row[col.field];
  }

  public getImageIImage(row: any, col: IHeaderColumn) {
    return {
      src: row[col.field],
      width: 80,
      height: 80,
    } as IImage;
  }
}
