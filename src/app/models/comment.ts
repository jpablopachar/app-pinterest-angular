import { UserPin } from './auth'

/**
 * Representa un comentario realizado por un usuario en un pin.
 *
 * @property _id Identificador único del comentario.
 * @property description Texto o contenido del comentario.
 * @property pin Identificador del pin al que pertenece el comentario.
 * @property user Información del usuario que realizó el comentario.
 * @property createdAt Fecha de creación del comentario.
 * @property updatedAt Fecha de la última actualización del comentario.
 * @property __v Versión del documento (usado por Mongoose).
 */
export interface Comment {
  _id: string
  description: string
  pin: string
  user: UserPin
  createdAt: Date
  updatedAt: Date
  __v: number
}

/**
 * Representa la estructura de una solicitud para crear un comentario.
 * 
 * @property description - El contenido del comentario.
 * @property pin - El identificador del pin al que pertenece el comentario.
 */
export interface CommentRequest {
  description: string
  pin: string
}
