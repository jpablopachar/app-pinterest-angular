import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '@app/services/auth.service'
import { AuthStore } from '@app/store/auth.store'

/**
 * @interface RegisterForm
 * @description
 * Representa el formulario de registro de usuario.
 * Contiene los controles de formulario necesarios para registrar un nuevo usuario,
 * incluyendo nombre para mostrar, correo electrónico, contraseña y nombre de usuario.
 *
 * @property {FormControl<string>} displayName - Control para el nombre para mostrar del usuario.
 * @property {FormControl<string>} email - Control para el correo electrónico del usuario.
 * @property {FormControl<string>} password - Control para la contraseña del usuario.
 * @property {FormControl<string>} username - Control para el nombre de usuario único.
 */
interface RegisterForm {
  displayName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  username: FormControl<string>;
}

/**
 * @interface LoginForm
 * @description
 * Representa el formulario de inicio de sesión, conteniendo los controles de formulario para el correo electrónico y la contraseña.
 *
 * @property {FormControl<string>} email - Control de formulario para el campo de correo electrónico del usuario.
 * @property {FormControl<string>} password - Control de formulario para el campo de contraseña del usuario.
 */
interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './Auth.component.html',
  styleUrl: './Auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);

  public authStore = inject(AuthStore);
  public authService = inject(AuthService);

  public $isRegister = signal(false);
  public $error = signal<string | null>(null);

  public registerForm: FormGroup<RegisterForm>;
  public loginForm: FormGroup<LoginForm>;

  constructor() {
    this.registerForm = this._formBuilder.group<RegisterForm>({
      displayName: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      username: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

    this.loginForm = this._formBuilder.group<LoginForm>({
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  /**
   * Maneja el envío del formulario de autenticación.
   *
   * Dependiendo del modo actual (registro o inicio de sesión), obtiene los datos del formulario correspondiente
   * y llama al servicio de autenticación para registrar o iniciar sesión al usuario.
   *
   * Si la autenticación es exitosa, almacena el usuario actual y navega a la página principal.
   * Si ocurre un error, establece el mensaje de error correspondiente.
   */
  public handleSubmit(): void {
    const body = this.$isRegister()
      ? this.registerForm.getRawValue()
      : this.loginForm.getRawValue();

    this.authService
      .registerLogin(this.$isRegister() ? 'register' : 'login', body)
      .subscribe({
        next: (res) => {
          this.authStore.setCurrentUser(res);

          this._router.navigate(['/']);
        },
        error: (err) => {
          this.$error.set(err.message);
        },
      });
  }

  /**
   * Alterna entre los modos de autenticación (inicio de sesión y registro).
   *
   * Este método invierte el estado actual de `$isRegister` para cambiar entre los formularios
   * de inicio de sesión y registro. Además, limpia cualquier error previo y reinicia ambos formularios.
   *
   * @returns {void} No retorna ningún valor.
   */
  public toggleAuthMode(): void {
    this.$isRegister.update((prev) => !prev);
    this.$error.set(null);

    this.loginForm.reset();
    this.registerForm.reset();
  }
}
