import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './Comments.component.html',
  styleUrl: './Comments.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
  public $id = input.required<string>();
}
