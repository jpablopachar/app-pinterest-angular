import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'app-post-interactions',
  imports: [],
  templateUrl: './PostInteractions.component.html',
  styleUrl: './PostInteractions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostInteractionsComponent {
  public $postId = input.required<string>();
}
