import { httpResource } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { CommentsComponent } from '@app/components/Comments/Comments.component'
import { ImageComponent } from '@app/components/Image/Image.component'
import { PostInteractionsComponent } from '@app/components/PostInteractions/PostInteractions.component'
import { Pin } from '@app/models/pin'
import { PinService } from '@app/services/pin.service'

@Component({
  selector: 'app-post-page',
  imports: [
    RouterLink,
    ImageComponent,
    PostInteractionsComponent,
    CommentsComponent,
  ],
  templateUrl: './PostPage.component.html',
  styleUrl: './PostPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent {
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _pinService = inject(PinService)

  private _pinId = this._route.snapshot.params['id'] || null

  $resource = httpResource<Pin>(() => this._pinService.getPin(this._pinId))

  /**
   * Navega a la ruta anterior en la jerarquía de rutas.
   * Utiliza el enrutador de Angular para retroceder un nivel relativo a la ruta actual.
   *
   * @returns {void} No retorna ningún valor.
   */
  public goBack() {
    this._router.navigate(['..'], { relativeTo: this._route })
  }
}
