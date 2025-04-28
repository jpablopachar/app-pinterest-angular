import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  imports: [],
  templateUrl: './CommentForm.component.html',
  styleUrl: './CommentForm.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent { }
