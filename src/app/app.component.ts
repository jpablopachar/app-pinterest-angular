import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { AuthStore } from './store/auth.store'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private _authStore = inject(AuthStore)

  constructor() {
    this._authStore.loadCurrentUser()
  }
}
