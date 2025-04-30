import { Injectable } from '@angular/core'
import { ResourceResponse } from '@app/models/general'
import { environment } from '@src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private _url = `${environment.apiUrl}/boards`

  /**
   * Obtiene la información necesaria para realizar una solicitud de obtención de tableros
   * asociados a un usuario específico.
   *
   * @param userId - El identificador único del usuario cuyos tableros se desean obtener.
   * @returns Un objeto que contiene la URL de la solicitud y los parámetros requeridos.
   */
  public getBoardByUserId(userId: string): {
    url: string
    params: Record<string, string>
  } {
    return {
      url: this._url,
      params: { userId },
    }
  }

  /**
   * Obtiene los tableros asociados a un usuario específico por su ID.
   *
   * @param userId - El identificador único del usuario cuyos tableros se desean obtener.
   * @returns Un objeto `ResourceResponse` que contiene la URL para acceder a los tableros del usuario.
   */
  public getBoardsByUserId(userId: string): ResourceResponse {
    return {
      url: `${this._url}/${userId}`,
    }
  }
}
