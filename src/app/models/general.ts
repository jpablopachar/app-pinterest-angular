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

/**
 * Representa una imagen de vista previa con su URL y dimensiones.
 *
 * @property {string} url - URL de la imagen de vista previa.
 * @property {number} height - Altura de la imagen en píxeles.
 * @property {number} width - Ancho de la imagen en píxeles.
 */
export interface PreviewImg {
  url: string
  height: number
  width: number
}