import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Comment, CommentRequest } from '@app/models/comment'
import { ResourceResponse } from '@app/models/general'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _url = `${environment.apiUrl}/comments`

  private _http = inject(HttpClient)

  /**
   * Obtiene los comentarios asociados a un recurso específico.
   * 
   * @param id - El identificador único del recurso para el cual se desean obtener los comentarios.
   * @returns Un objeto `ResourceResponse` que contiene la URL para acceder a los comentarios del recurso especificado.
   */
  public getComments(id: string): ResourceResponse {
    return {
      url: `${this._url}/${id}`,
    }
  }

  /**
   * Agrega un nuevo comentario enviando una solicitud POST al servidor.
   *
   * @param body - Objeto que contiene los datos necesarios para crear el comentario.
   * @returns Un Observable que emite el comentario creado.
   */
  public addComment(body: CommentRequest): Observable<Comment> {
    return this._http.post<Comment>(this._url, body)
  }
}
