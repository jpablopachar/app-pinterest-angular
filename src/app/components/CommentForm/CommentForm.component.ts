import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommentRequest } from '@app/models/comment'
import { CommentService } from '@app/services/comment.service'
import { PickerComponent } from '@ctrl/ngx-emoji-mart'

@Component({
  selector: 'app-comment-form',
  imports: [FormsModule, PickerComponent],
  templateUrl: './CommentForm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent {
  private _commentService = inject(CommentService)

  public $id = input.required<string>()

  public $reloadComments = output<void>()

  public $open = signal(false)
  public $desc = signal('')

  /**
   * Maneja el evento de envío del formulario de comentarios.
   *
   * Previene el comportamiento por defecto del formulario, construye el objeto de solicitud
   * con la descripción y el identificador del pin, y llama al servicio para agregar el comentario.
   * Al completar exitosamente la operación, limpia el campo de descripción y cierra el formulario.
   *
   * @param event El evento de envío del formulario (`SubmitEvent`).
   */
  public handleSubmit(event: SubmitEvent): void {
    event.preventDefault()

    const body: CommentRequest = {
      description: this.$desc(),
      pin: this.$id(),
    }

    this._commentService.addComment(body).subscribe({
      next: () => {
        this.$desc.set('')
        this.$open.set(false)

        this.$reloadComments.emit()
      },
    })
  }

  /**
   * Maneja el evento de cambio en el campo de descripción.
   * Extrae el valor del input y actualiza la propiedad reactiva `$desc`.
   *
   * @param event El evento de entrada generado por el usuario.
   */
  public handleDesc(event: Event): void {
    const value = (event.target as HTMLInputElement).value

    this.$desc.set(value)
  }

  /**
   * Alterna el estado de apertura del componente de comentarios.
   *
   * Este método invierte el valor actual de la propiedad reactiva `$open`,
   * permitiendo abrir o cerrar la sección de comentarios según su estado previo.
   */
  public handleOpen(): void {
    this.$open.update((prev) => !prev)
  }

  /**
   * Maneja la selección de un emoji por parte del usuario.
   *
   * @param event - El evento que contiene la información del emoji seleccionado,
   *                incluyendo la propiedad `emoji.native` que representa el emoji en formato de texto.
   *
   * Actualiza la descripción agregando el emoji seleccionado al texto existente.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handleEmojiSelect(event: any): void {
    this.$desc.update((prev) => prev + ' ' + event.emoji.native)
  }
}
