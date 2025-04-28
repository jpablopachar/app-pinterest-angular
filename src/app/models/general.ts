/**
 * Representa la respuesta de un recurso, incluyendo la URL y parámetros opcionales.
 *
 * @property url - La URL del recurso.
 * @property params - (Opcional) Un objeto que contiene los parámetros de la solicitud como pares clave-valor.
 */
export interface ResourceResponse {
  url: string
  params?: Record<string, string>
}