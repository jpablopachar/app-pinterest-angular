import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LeftBarComponent } from '../../components/LeftBar/LeftBar.component'
import { TopBarComponent } from '../../components/TopBar/TopBar.component'

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, LeftBarComponent, TopBarComponent],
  template: `
    <div class="app">
      <app-left-bar />
      <div class="content">
        <app-top-bar />
        <router-outlet />
      </div>
    </div>
  `,
  styles: [
    `
      .app {
        width: 100%;
        display: flex;
        gap: 16px;
      }

      .content {
        flex: 1;
        margin-right: 16px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
