import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
} from '@angular/core'
import { RouterLink } from '@angular/router'
import { Item } from '@app/models/item'
import { ImageComponent } from '../Image/Image.component'

@Component({
  selector: 'app-gallery-item',
  imports: [RouterLink, ImageComponent],
  templateUrl: './GalleryItem.component.html',
  styleUrl: './GalleryItem.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryItemComponent {
  public $item = input<Item | null>(null);

  public $optimizedHeight = signal(0);
  public $gridRowEnd = signal('');

  constructor() {
    effect(() => {
      const item = this.$item();

      if (item) {
        this.$optimizedHeight.set(Math.round((372 * item.height) / item.width));
        this.$gridRowEnd.set(`span ${Math.ceil(item.height / 100)}`);

        console.log(this.$optimizedHeight());
        console.log(this.$gridRowEnd());
      }
    });
  }
}
