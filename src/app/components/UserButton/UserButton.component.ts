import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '@app/services/auth.service'
import { AuthStore } from '@app/store/auth.store'
import { ImageComponent } from '../Image/Image.component'

@Component({
  selector: 'app-user-button',
  imports: [RouterLink, ImageComponent],
  templateUrl: './UserButton.component.html',
  styleUrl: './UserButton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent {
  private _router = inject(Router)
  private _authService = inject(AuthService)

  public authStore = inject(AuthStore)

  public $open = signal(false)

  /**
   * Maneja el proceso de cierre de sesión del usuario.
   *
   * Este método llama al servicio de autenticación para cerrar la sesión del usuario actual.
   * Si la operación es exitosa, elimina la información del usuario almacenada y redirige a la página de autenticación.
   * En caso de error durante el cierre de sesión, muestra el error en la consola.
   */
  public handleLogout(): void {
    this._authService.logout().subscribe({
      next: () => {
        this.authStore.removeCurrentUser()
        this._router.navigate(['/auth'])
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err)
      },
    })
  }

  /**
   * Alterna el estado del menú de usuario entre abierto y cerrado.
   *
   * Este método actualiza el valor de la propiedad reactiva `$open`,
   * invirtiendo su estado actual. Si el menú está abierto, lo cierra;
   * si está cerrado, lo abre.
   */
  public toggleMenu(): void {
    this.$open.update((prev) => !prev)
  }
}
