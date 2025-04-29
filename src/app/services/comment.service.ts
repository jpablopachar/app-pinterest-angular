import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Comment, CommentRequest } from '@app/models/comment'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _url = `${environment.apiUrl}/comments`

  private _http = inject(HttpClient)

  /**
   * Obtiene los comentarios asociados a un identificador específico.
   *
   * @param id - El identificador del recurso para el cual se desean obtener los comentarios.
   * @returns Un observable que emite un arreglo de comentarios (`Comment[]`).
   */
  public getCommentsById(id: string): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${this._url}/${id}`, {
      withCredentials: true,
    })
  }

  /**
   * Agrega un nuevo comentario enviando una solicitud POST al servidor.
   *
   * @param body - Objeto que contiene los datos necesarios para crear el comentario.
   * @returns Un Observable que emite el comentario creado.
   */
  public addComment(body: CommentRequest): Observable<Comment> {
    return this._http.post<Comment>(this._url, body, { withCredentials: true })
  }
}
