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
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';

import { ValueFormatterPipe } from './pipes/valueFormatter.pipe';

import { FormTableComponent } from './components/form-table/form-table.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormMenuComponent } from './components/form-menu/form-menu.component';
import { FormImageComponent } from './components/form-image/form-image.component';
import { FormMultiSelectComponent } from './components/form-multi-select/form-multi-select.component';
import { FormTabViewComponent } from './components/form-tab-view/form-tab-view.component';
import { GenerateComponentDirective } from './directives/generate-component.directive';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { FormInputCalendarComponent } from './components/form-input-calendar/form-input-calendar.component';
import { FormInputNumberComponent } from './components/form-input-number/form-input-number.component';
import { FormSpinnerLoadingComponent } from './components/form-spinner-loading/form-spinner-loading.component';
import { UploadImageDialogComponent } from './dialogs/upload-image-dialog/upload-image-dialog.component';
import { FormDropdownComponent } from './components/form-dropdown/form-dropdown.component';
import { FormInputSwitchComponent } from './components/form-input-switch/form-input-switch.component';
import { FormLabelComponent } from './components/form-label/form-label.component';

import { SpinnerService } from './services/spinner.service';
import { DialogCommonService } from './dialogs/dialog-common.service';
import { RouterService } from './services/router.service';
import { ToastService } from './services/toast.service';
import { FormUploadFileComponent } from './components/form-upload-file/form-upload-file.component';

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
  CalendarModule,
  InputNumberModule,
  FileUploadModule,
  ProgressSpinnerModule,
  DropdownModule,
  InputSwitchModule,
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
  FormDialogComponent,
  FormInputCalendarComponent,
  FormInputNumberComponent,
  FormSpinnerLoadingComponent,
  FormDropdownComponent,
  FormInputSwitchComponent,
  FormLabelComponent,
  FormUploadFileComponent,
];

export const commonDialogs: any[] = [UploadImageDialogComponent];

export const pipes: any[] = [ValueFormatterPipe];

export const services: any[] = [
  DialogCommonService,
  RouterService,
  SpinnerService,
  ToastService,
];

export const directives: any[] = [GenerateComponentDirective];
