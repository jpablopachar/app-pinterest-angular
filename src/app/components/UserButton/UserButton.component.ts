import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { AuthStore } from '@app/store/auth.store'

@Component({
  selector: 'app-user-button',
  imports: [],
  templateUrl: './UserButton.component.html',
  styleUrl: './UserButton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent {
  private _authStore = inject(AuthStore);

  public open = signal(false);
}
