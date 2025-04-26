import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  AuthResponse,
  LoginRequest,
  ProfileUserResponse,
  RegisterRequest,
} from '@app/models/auth'
import { ActionAuth } from '@app/types/actionAuth'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);

  private _url = `${environment.apiUrl}/users`;

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
   * Cierra la sesión del usuario actual enviando una solicitud POST al endpoint de logout.
   *
   * @returns Un Observable que emite un objeto con un mensaje de confirmación al cerrar sesión.
   */
  public logout(): Observable<{ message: string }> {
    return this._http.post<{ message: string }>(`${this._url}/auth/logout`, {});
  }

  /**
   * Obtiene el perfil de un usuario a partir de su nombre de usuario.
   *
   * @param username Nombre de usuario cuyo perfil se desea obtener.
   * @returns Un Observable que emite los datos del perfil del usuario solicitado.
   */
  public getUser(username: string): Observable<ProfileUserResponse> {
    return this._http.get<ProfileUserResponse>(`${this._url}/${username}`);
  }

  /**
   * Realiza una solicitud para seguir a un usuario especificado por su nombre de usuario.
   *
   * @param username - Nombre de usuario del usuario al que se desea seguir.
   * @returns Un Observable que emite un objeto con un mensaje de confirmación de la operación.
   */
  public followUser(username: string): Observable<{ message: string }> {
    return this._http.post<{ message: string }>(
      `${this._url}/follow/${username}`,
      {}
    );
  }
}
