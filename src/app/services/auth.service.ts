import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal, WritableSignal } from '@angular/core'
import {
  AuthResponse,
  LoginRequest,
  ProfileUserResponse,
  RegisterRequest,
} from '@app/models/auth'
import { ActionAuth } from '@app/types/actionAuth'
import { environment } from '@src/environments/environment'
import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);

  private _url = `${environment.apiUrl}/users`;

  private $loadingSignal = signal<boolean>(false);
  private $errorSignal = signal<string | null>(null);
  private $authResponseSignal = signal<AuthResponse | null>(null);
  private $logoutResponseSignal = signal<{ message: string } | null>(null);
  private $userProfileSignal = signal<ProfileUserResponse | null>(null);
  private $followUserResponseSignal = signal<{ message: string } | null>(null);

  private cancelRegisterLogin$ = new Subject<void>();
  private cancelLogout$ = new Subject<void>();
  private cancelGetUser$ = new Subject<void>();
  private cancelFollowUser$ = new Subject<void>();

  public $loading = this.$loadingSignal.asReadonly();
  public $error = this.$errorSignal.asReadonly();
  public $authResponse = this.$authResponseSignal.asReadonly();
  public $logoutResponse = this.$logoutResponseSignal.asReadonly();
  public $userProfile = this.$userProfileSignal.asReadonly();
  public $followUserResponse = this.$followUserResponseSignal.asReadonly();

  /**
   * Maneja una solicitud asíncrona y actualiza las señales de estado correspondientes.
   *
   * @template T El tipo de dato esperado en la respuesta.
   * @param request Observable que representa la solicitud a ejecutar.
   * @param responseSignal Señal escribible donde se almacenará la respuesta recibida o `null` en caso de error.
   * @param customErrorMessage Mensaje de error personalizado que se mostrará si ocurre un error y no se obtiene un mensaje específico.
   * @param cancelSubject Subject utilizado para cancelar la suscripción al observable cuando sea necesario.
   *
   * @remarks
   * Este método gestiona el estado de carga y error durante la ejecución de la solicitud.
   * Al iniciar, establece la señal de carga en `true` y limpia cualquier error previo.
   * Al recibir una respuesta exitosa, actualiza la señal de respuesta y desactiva la carga.
   * Si ocurre un error, desactiva la carga, establece el mensaje de error y la señal de respuesta en `null`.
   */
  private _handleRequest<T>(
    request: Observable<T>,
    responseSignal: WritableSignal<T | null>,
    customErrorMessage: string,
    cancelSubject: Subject<void>
  ): void {
    this.$loadingSignal.set(true);
    this.$errorSignal.set(null);

    responseSignal.set(null);

    request
      .pipe(
        takeUntil(cancelSubject),
        tap((res) => {
          this.$loadingSignal.set(false);

          responseSignal.set(res);
        }),
        catchError((err) => {
          this.$loadingSignal.set(false);
          this.$errorSignal.set(err.message || customErrorMessage);

          return of(null);
        })
      )
      .subscribe();
  }

  /**
   * Realiza una solicitud HTTP POST para registrar o iniciar sesión de un usuario.
   *
   * @param action - Acción a realizar, puede ser 'register' o 'login'.
   * @param body - Objeto que contiene los datos necesarios para el registro o inicio de sesión.
   * @returns Un observable que emite la respuesta de autenticación del servidor.
   */
  public registerLogin(
    action: ActionAuth,
    body: RegisterRequest | LoginRequest
  ): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this._url}/auth/${action}`, body);
  }

  /**
   * Cierra la sesión del usuario actual.
   *
   * Este método cancela cualquier solicitud previa de cierre de sesión en curso,
   * y luego envía una nueva solicitud HTTP al endpoint correspondiente.
   * El resultado de la solicitud se maneja y se notifica a través de la señal `$logoutResponseSignal`.
   *
   * @returns {void} No retorna ningún valor.
   */
  public logout(): void {
    this.cancelLogout$.next();

    this._handleRequest(
      this._http.post<{ message: string }>(`${this._url}/auth/logout`, {}),
      this.$logoutResponseSignal,
      'Error en cierre de sesión',
      this.cancelLogout$
    );
  }

  /**
   * Obtiene el perfil de un usuario a partir de su nombre de usuario.
   *
   * Este método cancela cualquier solicitud previa de obtención de perfil en curso,
   * y luego envía una nueva solicitud HTTP al endpoint correspondiente para obtener los datos del usuario.
   * El resultado de la solicitud se maneja y se notifica a través de la señal `$userProfileSignal`.
   *
   * @param username Nombre de usuario cuyo perfil se desea obtener.
   */
  public getUser(username: string): void {
    this.cancelGetUser$.next();

    this._handleRequest(
      this._http.get<ProfileUserResponse>(`${this._url}/${username}`),
      this.$userProfileSignal,
      'Error al obtener el perfil del usuario',
      this.cancelGetUser$
    );
  }

  /**
   * Realiza una solicitud para seguir a un usuario especificado por su nombre de usuario.
   *
   * Este método cancela cualquier solicitud previa de seguimiento de usuario en curso,
   * y luego envía una nueva solicitud HTTP al endpoint correspondiente.
   * El resultado de la solicitud se maneja y se notifica a través de la señal `$followUserResponseSignal`.
   *
   * @param username - Nombre de usuario del usuario al que se desea seguir.
   */
  public followUser(username: string): void {
    this.cancelFollowUser$.next();

    this._handleRequest(
      this._http.post<{ message: string }>(
        `${this._url}/follow/${username}`,
        {}
      ),
      this.$followUserResponseSignal,
      'Error en seguir al usuario',
      this.cancelFollowUser$
    );
  }
}
