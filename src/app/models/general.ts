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

/**
 * Representa el tamaño de un retrato con nombre, ancho y alto.
 *
 * @property {string} name - El nombre descriptivo del tamaño del retrato.
 * @property {number} width - El ancho del retrato en píxeles.
 * @property {number} height - La altura del retrato en píxeles.
 */
export interface PortraitSize {
  name: string
  width: number
  height: number
}

/**
 * Representa el tamaño de un paisaje con un nombre descriptivo, ancho y alto.
 *
 * @property {string} name - Nombre descriptivo del tamaño del paisaje.
 * @property {number} width - Ancho del paisaje en píxeles.
 * @property {number} height - Alto del paisaje en píxeles.
 */
export interface LandscapeSize {
  name: string
  width: number
  height: number
}
