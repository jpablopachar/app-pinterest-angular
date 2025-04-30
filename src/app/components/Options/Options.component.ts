import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core'
import { landscapeSizes, portraitSizes } from '@app/datas/optionData'
import { PreviewImg } from '@app/models/general'
import { EditorStore } from '@app/store/editor.store'

@Component({
  selector: 'app-options',
  imports: [],
  templateUrl: './Options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent {
  private _editorStore = inject(EditorStore)

  public $previewImg = input.required<PreviewImg>()

  public $isColorPickerOpen = signal(false)

  public landscapeSizes = landscapeSizes
  public portraitSizes = portraitSizes

  public originalOrientation =
    this.$previewImg().width < this.$previewImg().height
      ? 'portrait'
      : 'landscape'

  /**
   * Alterna el estado de visibilidad del selector de color.
   *
   * Este método actualiza el valor de `$isColorPickerOpen` invirtiendo su estado actual,
   * permitiendo mostrar u ocultar el selector de color en la interfaz de usuario.
   */
  public toggleColorPicker(): void {
    this.$isColorPickerOpen.update((prev) => !prev)
  }

  /**
   * Maneja el evento de clic para cambiar la orientación de la imagen en el editor.
   *
   * Calcula la nueva altura del lienzo en función de la orientación seleccionada y la imagen de previsualización.
   * Si la orientación seleccionada es igual a la original, mantiene la proporción original de la imagen.
   * Si la orientación cambia, invierte la proporción para ajustar la altura correctamente.
   *
   * Finalmente, actualiza las opciones del lienzo en el store del editor con la nueva orientación, tamaño y altura calculada.
   *
   * @param orientation - La nueva orientación seleccionada para la imagen (por ejemplo, 'horizontal' o 'vertical').
   */
  public handleOrientationClick(orientation: string): void {
    let newHeight

    if (this.originalOrientation === orientation) {
      newHeight = (375 * this.$previewImg().height) / this.$previewImg().width
    } else {
      newHeight = (375 * this.$previewImg().width) / this.$previewImg().height
    }

    this._editorStore.setCanvasOptions({
      ...this._editorStore.$canvasOptions(),
      orientation,
      size: 'original',
      height: newHeight,
    })
  }

  public handleSizeClick(size: any): void {
    let newHeight

    if (size === 'original') {
      if (
        this.originalOrientation ===
        this._editorStore.$canvasOptions().orientation
      ) {
        newHeight = (375 * this.$previewImg().height) / this.$previewImg().width
      } else {
        newHeight = (375 * this.$previewImg().width) / this.$previewImg().height
      }
    } else {
      newHeight = (375 * size.height) / size.width
    }

    this._editorStore.setCanvasOptions({
      ...this._editorStore.$canvasOptions(),
      size: size === 'original' ? 'original' : size.name,
      height: newHeight!,
    })
  }
}
