import { AngularEditorModule } from '@kolkov/angular-editor';
import { MarkdownModule } from 'ngx-markdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { ValueFormatterPipe } from './pipes/valueFormatter.pipe';

import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormDescriptionContentComponent } from './components/form-description-content/form-description-content.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { FormDropdownComponent } from './components/form-dropdown/form-dropdown.component';
import { FormEditorComponent } from './components/form-editor/form-editor.component';
import { FormImageComponent } from './components/form-image/form-image.component';
import { FormInputCalendarComponent } from './components/form-input-calendar/form-input-calendar.component';
import { FormInputNumberComponent } from './components/form-input-number/form-input-number.component';
import { FormInputSwitchComponent } from './components/form-input-switch/form-input-switch.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormLabelComponent } from './components/form-label/form-label.component';
import { FormListBoxComponent } from './components/form-list-box/form-list-box.component';
import { FormMarkdownComponent } from './components/form-markdown/form-markdown.component';
import { FormMenuComponent } from './components/form-menu/form-menu.component';
import { FormMultiSelectComponent } from './components/form-multi-select/form-multi-select.component';
import { FormSelectButtonComponent } from './components/form-select-button/form-select-button.component';
import { FormSpinnerLoadingComponent } from './components/form-spinner-loading/form-spinner-loading.component';
import { FormTabViewComponent } from './components/form-tab-view/form-tab-view.component';
import { FormTableComponent } from './components/form-table/form-table.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { FormUploadFileNameComponent } from './components/form-upload-file-name/form-upload-file-name.component';

import { GenerateComponentDirective } from './directives/generate-component.directive';

import { ConfirmNoteDialogComponent } from './dialogs/confirm-note-dialog/confirm-note-dialog.component';
import { UploadImageDialogComponent } from './dialogs/upload-image-dialog/upload-image-dialog.component';

import { FormUploadFileComponent } from './components/form-upload-file/form-upload-file.component';
import { DialogCommonService } from './dialogs/dialog-common.service';
import { RouterService } from './services/router.service';
import { SpinnerService } from './services/spinner.service';
import { ToastService } from './services/toast.service';

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
  SelectButtonModule,
  MarkdownModule.forRoot(),
  AngularEditorModule,
  ListboxModule,
  InputTextareaModule,
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
  FormUploadFileNameComponent,
  FormTextareaComponent,
  FormSelectButtonComponent,
  FormDescriptionContentComponent,
  FormMarkdownComponent,
  FormEditorComponent,
  FormListBoxComponent,
];

export const commonDialogs: any[] = [
  UploadImageDialogComponent,
  ConfirmNoteDialogComponent,
];

export const pipes: any[] = [ValueFormatterPipe];

export const services: any[] = [
  DialogCommonService,
  RouterService,
  SpinnerService,
  ToastService,
];

export const directives: any[] = [GenerateComponentDirective];
