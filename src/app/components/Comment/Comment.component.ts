import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { Comment } from '@app/models/comment'
import { TimePipe } from '@app/pipes/time.pipe'
import { ImageComponent } from '../Image/Image.component'

@Component({
  selector: 'app-comment',
  imports: [TimePipe, ImageComponent],
  template: `
    <div class="comment">
      <app-image
        [$src]="$comment().user.img || '/general/noAvatar.png'"
        [$alt]="''"
      />
      <div class="commentContent">
        <span class="commentUsername">{{ $comment().user.displayName }}</span>
        <p class="commentText">{{ $comment().description }}</p>
        <span class="commentTime">{{ $comment().createdAt | appTime }}</span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  public $comment = input.required<Comment>()
}
