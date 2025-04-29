import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { ResourceResponse } from '@app/models/general'
import { PinInteractionCheckResponse, PinsParams } from '@app/models/pin'
import { ActionPin } from '@app/types/actionPin'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class PinService {
  private _http = inject(HttpClient)

  private _url = `${environment.apiUrl}/pins`

  /**
   * Obtiene los parámetros necesarios para realizar una consulta de pines.
   *
   * @param params Objeto que contiene los parámetros de búsqueda, incluyendo:
   *  - `pageParam`: número de página para la paginación.
   *  - `search`: término de búsqueda opcional para filtrar los pines.
   *  - `userId`: identificador de usuario opcional para filtrar los pines por usuario.
   *  - `boardId`: identificador de tablero opcional para filtrar los pines por tablero.
   * @returns Un objeto con la URL base y los parámetros de consulta construidos.
   */
  public getPins(params: PinsParams): ResourceResponse {
    const { pageParam, search, userId, boardId } = params
    const queryParams: Record<string, string> = {
      page: pageParam.toString(),
    }

    if (search) queryParams['search'] = search
    if (userId) queryParams['userId'] = userId
    if (boardId) queryParams['boardId'] = boardId

    return {
      url: this._url,
      params: queryParams,
    }
  }

  /**
   * Obtiene la información de un pin específico a partir de su identificador.
   *
   * @param id - El identificador único del pin que se desea obtener.
   * @returns Un objeto `ResourceResponse` que contiene la URL para acceder al recurso del pin.
   */
  public getPin(id: string): ResourceResponse {
    return {
      url: `${this._url}/${id}`,
    }
  }

  /**
   * Obtiene el estado de interacción del usuario con un pin específico.
   *
   * Realiza una solicitud HTTP GET al endpoint de interacción para verificar si el usuario ha interactuado
   * (por ejemplo, ha dado "me gusta" o guardado) con el pin identificado por el `postId` proporcionado.
   *
   * @param postId - El identificador único del pin a consultar.
   * @returns Un observable que emite la respuesta con el estado de interacción del pin.
   */
  public getInteractionCheckByPin(
    postId: string,
  ): Observable<PinInteractionCheckResponse> {
    return this._http.get<PinInteractionCheckResponse>(
      `${this._url}/interaction-check/${postId}`,
    )
  }

  /**
   * Realiza una interacción sobre un pin específico.
   *
   * @param id - El identificador único del pin con el que se desea interactuar.
   * @param type - El tipo de acción a realizar sobre el pin (por ejemplo, guardar, dar me gusta, etc.).
   * @returns Un observable que emite un objeto con un mensaje indicando el resultado de la interacción.
   */
  public interactPin(
    id: string,
    type: ActionPin,
  ): Observable<{ message: string }> {
    return this._http.post<{ message: string }>(
      `${this._url}/interact/${id}`,
      {
        type,
      },
      { withCredentials: true },
    )
  }
}
