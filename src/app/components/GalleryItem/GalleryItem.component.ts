import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Item } from '@app/models/item'
import { ImageComponent } from "../Image/Image.component"

@Component({
  selector: 'app-gallery-item',
  imports: [RouterLink, ImageComponent],
  templateUrl: './GalleryItem.component.html',
  styleUrl: './GalleryItem.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryItemComponent {
  public $item = input<Item | null>(null);

  public optimizedHeight = (372 * this.$item()!.height) / this.$item()!.width;
  public gridRowEnd = `span ${Math.ceil(this.$item()!.height / 100)}`;
}
