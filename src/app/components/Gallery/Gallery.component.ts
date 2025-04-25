import {
  ScrollingModule
} from '@angular/cdk/scrolling'
import { CommonModule } from '@angular/common'
import { httpResource } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core'
import { Pin, PinsResponse } from '@app/models/pin'
import { PinService } from '@app/services/pin.service'
import { GalleryItemComponent } from '../GalleryItem/GalleryItem.component'
import { SkeletonComponent } from '../Skeleton/Skeleton.component'

@Component({
  selector: 'app-gallery',
  imports: [
    CommonModule,
    ScrollingModule,
    GalleryItemComponent,
    SkeletonComponent,
  ],
  templateUrl: './Gallery.component.html',
  styleUrl: './Gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  private readonly _pinService = inject(PinService);

  public $search = input<string>('');
  public $userId = input<string>('');
  public $boardId = input<string>('');

  public $pageParam = signal(0);
  public $isLoadingMore = signal(false);
  public $nextCursor = signal<number | null>(null);
  public $pins = signal<Pin[]>([]);

  public $resource = httpResource<PinsResponse>(() =>
    this._pinService.getPins({
      pageParam: this.$pageParam(),
      search: this.$search(),
      userId: this.$userId(),
      boardId: this.$boardId(),
    })
  );

  constructor() {
    effect(() => {
      const resource = this.$resource;

      console.log('resource', resource);

      if (!resource.isLoading() && resource.value()) {
        this.$pins.update((prev) => [...prev, ...resource.value()!.pins]);
        this.$nextCursor.set(resource.value()!.nextCursor);
        this.$isLoadingMore.set(false);
      }
    });
  }

  /**
   * Maneja el evento de desplazamiento (scroll) en la galería.
   *
   * Este método se llama cuando el usuario se desplaza por la lista de elementos.
   * Si el índice actual está cerca del final de la lista (a 5 elementos del final),
   * hay más elementos para cargar (`$nextCursor` no es null) y no se está cargando actualmente,
   * entonces inicia la carga de más elementos incrementando el parámetro de página y
   * estableciendo el estado de carga.
   *
   * @param index - El índice actual del elemento visible en la galería.
   */
  public onScroll(index: number) {
    const totalItems = this.$pins().length;

    if (
      index >= totalItems - 5 &&
      this.$nextCursor() !== null &&
      !this.$isLoadingMore()
    ) {
      this.$isLoadingMore.set(true);
      this.$pageParam.update((page) => page + 1);
    }
  }
}
