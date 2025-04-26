import {
  CommonModule,
  NgOptimizedImage,
  provideImageKitLoader,
} from '@angular/common'
import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { SafeValue } from '@angular/platform-browser'
import { environment } from '@src/environments/environment'

@Component({
  selector: 'app-image',
  imports: [CommonModule, NgOptimizedImage],
  providers: [provideImageKitLoader(environment.imageKitUrlEndpoint)],
  template: `<img
    [ngSrc]="$src()"
    [ngClass]="$class()"
    [width]="$width()"
    [height]="$height()"
    [alt]="$alt()"
    priority
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  public $src = input<string | SafeValue>('');
  public $alt = input<string | string>('');
  public $width = input<number | null>(20);
  public $height = input<number | null>(20);
  public $class = input<string | null>(null);
}
