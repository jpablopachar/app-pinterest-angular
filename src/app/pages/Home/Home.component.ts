import { ChangeDetectionStrategy, Component } from '@angular/core'
import { GalleryComponent } from '@app/components/Gallery/Gallery.component'

@Component({
  selector: 'app-home',
  imports: [GalleryComponent],
  template: `<app-gallery />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
