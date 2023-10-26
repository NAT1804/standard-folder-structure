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
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';

import { ValueFormatterPipe } from './pipes/valueFormatter.pipe';

import { FormTableComponent } from './components/form-table/form-table.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormMenuComponent } from './components/form-menu/form-menu.component';
import { FormImageComponent } from './components/form-image/form-image.component';
import { FormMultiSelectComponent } from './components/form-multi-select/form-multi-select.component';
import { DialogService } from './dialogs/dialog.service';
import { RouterService } from './services/router.service';
import { FormTabViewComponent } from './components/form-tab-view/form-tab-view.component';
import { GenerateComponentDirective } from './directives/generate-component.directive';
import { FormInputComponent } from './components/form-input/form-input.component';

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
  TabViewModule,
  InputTextModule,
  //
];

export const commonComponents: any[] = [
  FormTableComponent,
  FormButtonComponent,
  FormMenuComponent,
  FormImageComponent,
  FormMultiSelectComponent,
  FormTabViewComponent,
  FormInputComponent,
];

export const pipes: any[] = [ValueFormatterPipe];

export const services: any[] = [DialogService, RouterService];

export const directives: any[] = [GenerateComponentDirective];
