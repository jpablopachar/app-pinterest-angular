import { NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-skeleton',
  imports: [NgClass],
  template: `
    <div class="skeleton-masonry">
      @for (index of items; track index) {
      <div class="skeleton-item" [ngClass]="'size-' + ((index % 5) + 1)"></div>
      }
    </div>
  `,
  styleUrl: './Skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  items = Array.from({ length: 21 }).map((_, index) => index);
}
