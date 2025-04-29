import { httpResource } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
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
export class CommentsComponent {
  private _commentService = inject(CommentService)

  public $id = input.required<string>()

  public $resource = httpResource<Comment[]>(() =>
    this._commentService.getComments(this.$id()),
  )
}
