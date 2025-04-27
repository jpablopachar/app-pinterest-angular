import { Pin } from "./pin"

/**
 * Representa un tablero en la aplicación.
 * 
 * @property _id Identificador único del tablero.
 * @property title Título del tablero.
 * @property user Identificador del usuario propietario del tablero.
 * @property createdAt Fecha de creación del tablero.
 * @property updatedAt Fecha de última actualización del tablero.
 * @property __v Versión del documento (usado por MongoDB).
 * @property pinCount Cantidad de pines asociados al tablero.
 * @property firstPin Primer pin del tablero.
 */
export interface Board {
  _id: string
  title: string
  user: string
  createdAt: Date
  updatedAt: Date
  __v: number
  pinCount: number
  firstPin: Pin
}
