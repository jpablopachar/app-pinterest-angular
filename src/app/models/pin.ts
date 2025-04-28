import { UserPin } from './auth'

/**
 * Representa la respuesta de una consulta de pines.
 *
 * @property {number | null} nextCursor - Cursor para la siguiente página de resultados, o null si no hay más resultados.
 * @property {Pin[]} pins - Lista de pines obtenidos en la respuesta.
 */
export interface PinsResponse {
  nextCursor: number | null
  pins: Pin[]
}

/**
 * Representa un Pin en la aplicación, que puede contener una imagen, título, descripción y otros metadatos.
 *
 * @property {_id} string - Identificador único del pin.
 * @property {media} string - URL del recurso multimedia asociado al pin.
 * @property {width} number - Ancho del recurso multimedia en píxeles.
 * @property {height} number - Alto del recurso multimedia en píxeles.
 * @property {title} string - Título del pin.
 * @property {description} string - Descripción del pin.
 * @property {link} null - Enlace asociado al pin (actualmente no utilizado).
 * @property {board} string - Identificador del tablero al que pertenece el pin.
 * @property {tags} string[] - Lista de etiquetas asociadas al pin.
 * @property {user} string - Identificador del usuario que creó el pin.
 * @property {createdAt} Date - Fecha de creación del pin.
 * @property {updatedAt} Date - Fecha de la última actualización del pin.
 * @property {__v} number - Versión del documento (usado por sistemas como Mongoose).
 */
export interface Pin {
  _id: string
  media: string
  width: number
  height: number
  title: string
  description: string
  link: string | null
  board: string
  tags: string[]
  user: UserPin
  createdAt: Date
  updatedAt: Date
  __v: number
}

/**
 * Parámetros utilizados para obtener pines.
 *
 * @property pageParam - Parámetro de paginación, normalmente un identificador de página o cursor.
 * @property [search] - (Opcional) Término de búsqueda para filtrar los pines.
 * @property [userId] - (Opcional) Identificador del usuario para filtrar los pines por usuario.
 * @property [boardId] - (Opcional) Identificador del tablero para filtrar los pines por tablero.
 */
export interface PinsParams {
  pageParam: number
  search?: string
  userId?: string
  boardId?: string
}

/**
 * Respuesta para verificar la interacción de un usuario con un pin.
 *
 * @property {boolean} isSaved Indica si el pin ha sido guardado por el usuario.
 * @property {boolean} isLiked Indica si el pin ha sido marcado como "me gusta" por el usuario.
 * @property {number} likeCount Número total de "me gusta" que tiene el pin.
 */
export interface PinInteractionCheckResponse {
  isSaved: boolean
  isLiked: boolean
  likeCount: number
}
