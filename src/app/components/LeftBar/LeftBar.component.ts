import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ImageComponent } from '@app/components/Image/Image.component'

@Component({
  selector: 'app-left-bar',
  imports: [RouterLink, ImageComponent],
  templateUrl: './LeftBar.component.html',
  styleUrl: './LeftBar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftBarComponent { }
