import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core'
import { Comment } from '@app/models/comment'
import { CommentService } from '@app/services/comment.service'
import { CommentComponent } from '../Comment/Comment.component'
import { CommentFormComponent } from '../CommentForm/CommentForm.component'

@Component({
  selector: 'app-comments',
  imports: [CommentComponent, CommentFormComponent],
  templateUrl: './Comments.component.html',
  styleUrl: './Comments.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
  private _commentService = inject(CommentService)

  public $id = input.required<string>()

  public $comments = signal<Comment[] | null>(null)
  public $loading = signal<boolean | null>(null)
  public $error = signal<string | null>(null)

  ngOnInit(): void {
    this.getComments()
  }

  /**
   * Obtiene los comentarios asociados al identificador actual.
   *
   * Este método establece el estado de carga a verdadero y limpia cualquier error previo.
   * Luego, solicita los comentarios utilizando el servicio de comentarios.
   *
   * - Si la solicitud es exitosa, actualiza la lista de comentarios y finaliza el estado de carga.
   * - Si ocurre un error, limpia la lista de comentarios, establece el mensaje de error y finaliza el estado de carga.
   *
   * @returns {void} No retorna ningún valor.
   */
  public getComments(): void {
    this.$loading.set(true)
    this.$error.set(null)

    this._commentService.getCommentsById(this.$id()).subscribe({
      next: (comments) => {
        this.$comments.set(comments)
        this.$loading.set(null)
      },
      error: (err) => {
        this.$comments.set(null)
        this.$error.set(err.message || 'Error al cargar los comentarios')
        this.$loading.set(null)
      },
    })
  }

  /**
   * Escucha y recarga los comentarios llamando al método `getComments`.
   * Este método se utiliza para actualizar la lista de comentarios cuando se detecta un evento de recarga.
   *
   * @returns {void} No retorna ningún valor.
   */
  public listenReloadComments(): void {
    this.getComments()
  }
}
