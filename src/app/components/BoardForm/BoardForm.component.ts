import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ImageComponent } from '../Image/Image.component'

@Component({
  selector: 'app-board-form',
  imports: [FormsModule, ImageComponent],
  templateUrl: './BoardForm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardFormComponent {
  public $newBoard = input.required<string>()
  public $isNewBoardOpen = input.required<boolean>()

  public $setNewBoard = output<string>()
  public $setIsNewBoardOpen = output<boolean>()

  /**
   * Maneja el evento de envío del formulario para crear un nuevo tablero.
   *
   * @param event El evento de envío del formulario (`SubmitEvent`).
   *
   * Previene el comportamiento por defecto del formulario, obtiene el valor del título
   * ingresado por el usuario y emite los eventos necesarios para crear un nuevo tablero
   * y cerrar el formulario de creación.
   */
  public handleSubmit(event: SubmitEvent): void {
    event.preventDefault()

    const title: string = (
      (event.target as HTMLFormElement)[0] as HTMLInputElement
    ).value

    this.$setNewBoard.emit(title)
    this.$setIsNewBoardOpen.emit(false)
  }
}
