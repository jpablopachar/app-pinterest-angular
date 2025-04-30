import { NgClass } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core'
import { landscapeSizes, portraitSizes } from '@app/datas/optionData'
import { PortraitSize, PreviewImg } from '@app/models/general'
import { EditorStore } from '@app/store/editor.store'
import { AngularColorfulModule } from 'angular-colorful'

@Component({
  selector: 'app-options',
  imports: [AngularColorfulModule, NgClass],
  templateUrl: './Options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent implements AfterViewInit {
  public editorStore = inject(EditorStore)

  public $previewImg = input.required<PreviewImg>()

  public $isColorPickerOpen = signal(false)

  public landscapeSizes = landscapeSizes
  public portraitSizes = portraitSizes

  public originalOrientation: string | null = null

  ngAfterViewInit(): void {
    this.originalOrientation =
      this.$previewImg().width < this.$previewImg().height
        ? 'portrait'
        : 'landscape'
  }

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

    this.editorStore.setCanvasOptions({
      ...this.editorStore.$canvasOptions(),
      orientation,
      size: 'original',
      height: newHeight,
    })
  }

  /**
   * Maneja el evento de selección de tamaño para el lienzo de edición.
   *
   * Dependiendo del tamaño seleccionado (`size`), calcula la nueva altura del lienzo
   * manteniendo la proporción adecuada. Si el tamaño es 'original', ajusta la altura
   * según la orientación original de la imagen y la orientación actual del lienzo.
   * Si se selecciona un tamaño personalizado, utiliza las dimensiones proporcionadas
   * por el objeto `PortraitSize`.
   *
   * Finalmente, actualiza las opciones del lienzo en el store del editor con el nuevo
   * tamaño y altura calculada.
   *
   * @param size - El tamaño seleccionado, que puede ser 'original' o un objeto `PortraitSize`.
   */
  public handleSizeClick(size: PortraitSize | string): void {
    let newHeight

    if (size === 'original') {
      if (
        this.originalOrientation ===
        this.editorStore.$canvasOptions().orientation
      ) {
        newHeight = (375 * this.$previewImg().height) / this.$previewImg().width
      } else {
        newHeight = (375 * this.$previewImg().width) / this.$previewImg().height
      }
    } else {
      newHeight =
        (375 * (size as PortraitSize).height) / (size as PortraitSize).width
    }

    this.editorStore.setCanvasOptions({
      ...this.editorStore.$canvasOptions(),
      size: size === 'original' ? 'original' : (size as PortraitSize).name,
      height: newHeight!,
    })
  }

  /**
   * Cambia el tamaño de la fuente en las opciones de texto del editor.
   *
   * Este método se activa al producirse un evento (por ejemplo, al cambiar el valor de un input).
   * Obtiene el nuevo valor del tamaño de fuente desde el evento, lo convierte a número y actualiza
   * las opciones de texto en el store del editor.
   *
   * @param event El evento que dispara el cambio, generalmente un evento de tipo input.
   */
  public changeFontSize(event: Event): void {
    const value = (event.target as HTMLInputElement).value

    this.editorStore.setTextOptions({
      ...this.editorStore.$textOptions(),
      fontSize: Number(value),
    })
  }

  /**
   * Cambia el color del texto en las opciones del editor.
   *
   * @param color - El nuevo color que se aplicará al texto.
   */
  public changeColor(color: string): void {
    this.editorStore.setTextOptions({
      ...this.editorStore.$textOptions(),
      color,
    })
  }

  /**
   * Cambia el color de fondo del lienzo en el editor.
   *
   * @param backgroundColor - El nuevo color de fondo que se aplicará al lienzo.
   */
  public changeBackgroundColor(backgroundColor: string): void {
    this.editorStore.setCanvasOptions({
      ...this.editorStore.$canvasOptions(),
      backgroundColor,
    })
  }
}
