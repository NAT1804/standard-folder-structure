import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ImageModule } from 'primeng/image';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ValueFormatterPipe } from './pipes/valueFormatter.pipe';

import { FormTableComponent } from './components/form-table/form-table.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormMenuComponent } from './components/form-menu/form-menu.component';
import { FormImageComponent } from './components/form-image/form-image.component';
import { FormMultiSelectComponent } from './components/form-multi-select/form-multi-select.component';
import { DialogService } from './dialogs/dialog.service';

export const commonModules: any[] = [
  // ngprime module
  MenuModule,
  TableModule,
  PaginatorModule,
  ButtonModule,
  TagModule,
  ImageModule,
  CheckboxModule,
  MultiSelectModule,
  ToastModule,
  ConfirmDialogModule,
  //
];

export const commonComponents: any[] = [
  FormTableComponent,
  FormButtonComponent,
  FormMenuComponent,
  FormImageComponent,
  FormMultiSelectComponent,
];

export const pipes: any[] = [ValueFormatterPipe];

export const services: any[] = [DialogService];
