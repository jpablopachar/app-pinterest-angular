import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { PinsParams } from '@app/models/pin'
import { environment } from '@src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PinService {
  private _http = inject(HttpClient);

  private _url = `${environment.apiUrl}/pins`;

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
  public getPins(params: PinsParams) {
    const { pageParam, search, userId, boardId } = params;
    const queryParams: Record<string, string> = {
      page: pageParam.toString(),
    };

    if (search) queryParams['search'] = search;
    if (userId) queryParams['userId'] = userId;
    if (boardId) queryParams['boardId'] = boardId;

    return {
      url: this._url,
      params: queryParams,
    };
  }
}
