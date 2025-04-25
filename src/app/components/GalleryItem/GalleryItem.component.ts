import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { Item } from '@app/models/item'

@Component({
  selector: 'app-gallery-item',
  imports: [],
  templateUrl: './GalleryItem.component.html',
  styleUrl: './GalleryItem.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryItemComponent {
  public $item = input<Item | null>(null);

  public optimizedHeight = (372 * this.$item()!.height) / this.$item()!.width;
}
