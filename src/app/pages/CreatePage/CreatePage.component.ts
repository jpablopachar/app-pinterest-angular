import { httpResource } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { BoardFormComponent } from '@app/components/BoardForm/BoardForm.component'
import { EditorComponent } from '@app/components/Editor/Editor.component'
import { Board } from '@app/models/board'
import { PreviewImg } from '@app/models/general'
import { BoardService } from '@app/services/board.service'
import { PinService } from '@app/services/pin.service'
import { AuthStore } from '@app/store/auth.store'
import { EditorStore } from '@app/store/editor.store'
import { ImageComponent } from '../../components/Image/Image.component'

/**
 * Interfaz que representa el formulario para la creación de una página.
 *
 * @property {FormControl<string>} title - Control de formulario para el título de la página.
 * @property {FormControl<string>} description - Control de formulario para la descripción de la página.
 * @property {FormControl<string | null>} link - Control de formulario para el enlace asociado, puede ser nulo.
 * @property {FormControl<string | null>} board - Control de formulario para el tablero seleccionado, puede ser nulo.
 * @property {FormControl<string[] | null>} tags - Control de formulario para las etiquetas asociadas, puede ser nulo.
 */
interface CreatePageForm {
  title: FormControl<string>
  description: FormControl<string>
  link: FormControl<string | null>
  board: FormControl<string | null>
  tags: FormControl<string[] | null>
}

@Component({
  selector: 'app-create-page',
  imports: [
    ReactiveFormsModule,
    EditorComponent,
    ImageComponent,
    BoardFormComponent,
  ],
  templateUrl: './CreatePage.component.html',
  styleUrl: './CreatePage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent {
  private readonly _formBuilder = inject(FormBuilder)
  private readonly _router = inject(Router)

  private _authStore = inject(AuthStore)
  private _editorStore = inject(EditorStore)

  private readonly _pinService = inject(PinService)
  private readonly _boardService = inject(BoardService)

  private _$currentUser = this._authStore.$currentUser

  public $file = signal<File | null>(null)
  public $previewImg = signal<PreviewImg>({ url: '', height: 0, width: 0 })
  public $isEditing = signal(false)
  public $newBoard = signal('')
  public $isNewBoardOpen = signal(false)

  public createPageForm: FormGroup<CreatePageForm>

  public $resource = httpResource<Board[]>(() =>
    this._boardService.getBoardsByUserId(this._$currentUser()!._id),
  )

  constructor() {
    this.createPageForm = this._formBuilder.group<CreatePageForm>({
      title: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      description: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      link: new FormControl<string>(''),
      board: new FormControl<string>(''),
      tags: new FormControl<string[]>([]),
    })

    effect(() => {
      const currentUser = this._$currentUser()

      if (!currentUser) {
        this._router.navigate(['/auth'])
      }

      const file = this.$file()

      if (file) {
        const img = new Image()

        img.src = URL.createObjectURL(file)

        img.onload = () => {
          this.$previewImg.set({
            url: URL.createObjectURL(file),
            height: img.height,
            width: img.width,
          })
        }
      }
    })
  }

  /**
   * Envía los datos del formulario para agregar un nuevo pin utilizando el servicio correspondiente.
   *
   * @param formData - Los datos del formulario encapsulados en un objeto FormData.
   *
   * Al completar exitosamente la operación, reinicia el estado del editor y navega a la página del nuevo pin creado.
   */
  private _postAddPin(formData: FormData): void {
    this._pinService.addPin(formData).subscribe({
      next: (res) => {
        this._editorStore.resetStore()
        this._router.navigate([`/pin/${res._id}`])
      },
    })
  }

  /**
   * Maneja el evento de selección de archivo desde un input HTML.
   * Extrae el primer archivo seleccionado y lo asigna al estado reactivo `$file`.
   *
   * @param event - El evento de cambio (`change`) del input de tipo archivo.
   */
  public handleFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0]

    this.$file.set(file)
  }

  /**
   * Alterna el estado de apertura del modal o interfaz para crear un nuevo tablero.
   *
   * Este método invierte el valor actual de `$isNewBoardOpen`, mostrando u ocultando
   * la interfaz correspondiente para la creación de un nuevo tablero.
   */
  public handleNewBoard(): void {
    this.$isNewBoardOpen.update((prev) => !prev)
  }

  /**
   * Maneja el envío del formulario para crear o editar un pin.
   *
   * Si el formulario está en modo edición, desactiva el modo edición.
   * Si no está en modo edición, recopila los valores del formulario,
   * crea un objeto FormData con los datos necesarios (incluyendo archivos y opciones de editor),
   * y llama al método para agregar un nuevo pin.
   *
   * @returns {void} No retorna ningún valor.
   */
  public handleSubmit(): void {
    if (this.$isEditing()) {
      this.$isEditing.set(false)
    } else {
      const { title, description, link, board, tags } =
        this.createPageForm.getRawValue()

      const formData = new FormData()

      formData.append('title', title)
      formData.append('description', description)
      formData.append('link', link as string)
      formData.append('board', board as string)
      formData.append('tags', JSON.stringify(tags))
      formData.append('media', this.$file() as File)
      formData.append(
        'textOptions',
        JSON.stringify(this._editorStore.$textOptions()),
      )
      formData.append(
        'canvasOptions',
        JSON.stringify(this._editorStore.$canvasOptions()),
      )
      formData.append('newBoard', this.$newBoard())

      this._postAddPin(formData)
    }
  }
}
