import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { MediaImageRoutingModule } from './media-image-routing';
import { MediaImageComponent } from './page/media-image.component';
import { CrudMediaImageDialogComponent } from './page/crud-media-image-dialog/crud-media-image-dialog.component';

@NgModule({
  declarations: [MediaImageComponent, CrudMediaImageDialogComponent],
  imports: [CommonModule, SharedModule, MediaImageRoutingModule],
})
export class MediaImageModule {}
