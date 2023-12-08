import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { MediaImageService } from '../service/media.service';
import { MediaImageRoutingModule } from './media-image-routing';
import { CrudMediaImageDialogComponent } from './page/crud-media-image-dialog/crud-media-image-dialog.component';
import { MediaImageComponent } from './page/media-image.component';

@NgModule({
  declarations: [MediaImageComponent, CrudMediaImageDialogComponent],
  imports: [CommonModule, SharedModule, MediaImageRoutingModule],
  providers: [MediaImageService],
})
export class MediaImageModule {}
