import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core'
import { PinInteractionCheckResponse } from '@app/models/pin'
import { PinService } from '@app/services/pin.service'
import { ActionPin } from '@app/types/actionPin'
import { ImageComponent } from '../Image/Image.component'

@Component({
  selector: 'app-post-interactions',
  imports: [ImageComponent],
  templateUrl: './PostInteractions.component.html',
  styleUrl: './PostInteractions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostInteractionsComponent implements OnInit {
  private _pinService = inject(PinService)

  public $postId = input.required<string>()

  public $data = signal<PinInteractionCheckResponse | null>(null)
  public $loading = signal<boolean | null>(null)

  ngOnInit(): void {
    this._getInteractionCheckByPin(this.$postId())
  }

  /**
   * Obtiene y actualiza el estado de interacción de un pin específico.
   *
   * Este método llama al servicio `_pinService.getInteractionCheckByPin` pasando el `postId` del pin.
   * Al recibir la respuesta, actualiza el observable `$data` con los datos obtenidos.
   * En caso de error, establece `$data` en `null`.
   *
   * @param postId - El identificador único del pin para verificar la interacción.
   */
  private _getInteractionCheckByPin(postId: string): void {
    this.$loading.set(true)

    this._pinService.getInteractionCheckByPin(postId).subscribe({
      next: (data): void => {
        this.$data.set(data)
        this.$loading.set(null)
      },
      error: (): void => {
        this.$data.set(null)
        this.$loading.set(null)
      },
    })
  }

  /**
   * Realiza una interacción con un pin específico según el tipo de acción proporcionado.
   *
   * Este método utiliza el servicio de pines para ejecutar una acción (como dar like, guardar, etc.)
   * sobre el pin identificado por el ID actual. Al completarse la acción, actualiza el estado de la
   * interacción consultando nuevamente el estado del pin.
   *
   * @param type El tipo de acción a realizar sobre el pin (por ejemplo, 'like', 'save', etc.).
   */
  public postInteractionWithPin(type: ActionPin) {
    this._pinService.interactPin(this.$postId(), type).subscribe({
      next: (): void => {
        this._getInteractionCheckByPin(this.$postId())
      },
    })
  }
}
