/**
 * Representa el tamaño de un retrato con nombre, ancho y alto.
 *
 * @property {string} name - El nombre descriptivo del tamaño del retrato.
 * @property {number} width - El ancho del retrato en píxeles.
 * @property {number} height - La altura del retrato en píxeles.
 */
interface PortraitSize {
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
interface LandscapeSize {
  name: string
  width: number
  height: number
}

/**
 * Un arreglo de objetos que representa diferentes proporciones de tamaño para orientación vertical (portrait).
 * Cada objeto contiene el nombre de la proporción y sus dimensiones correspondientes (ancho y alto).
 *
 * @constant
 * @type {Array<{name: string, width: number, height: number}>}
 * @property {string} name - El nombre de la proporción (por ejemplo, '1:2').
 * @property {number} width - El valor del ancho de la proporción.
 * @property {number} height - El valor del alto de la proporción.
 */
export const portraitSizes: PortraitSize[] = [
  {
    name: '1:2',
    width: 1,
    height: 2,
  },
  {
    name: '9:16',
    width: 9,
    height: 16,
  },
  {
    name: '2:3',
    width: 2,
    height: 3,
  },
  {
    name: '3:4',
    width: 3,
    height: 4,
  },
  {
    name: '4:5',
    width: 4,
    height: 5,
  },
  {
    name: '1:1',
    width: 1,
    height: 1,
  },
]

/**
 * Un arreglo de objetos que representa diferentes proporciones de aspecto para imágenes en orientación horizontal (landscape).
 * Cada objeto contiene el nombre de la proporción y sus dimensiones correspondientes en ancho y alto.
 *
 * @constant
 * @type {Array<{name: string, width: number, height: number}>}
 * @property {string} name - Nombre descriptivo de la proporción (por ejemplo, '16:9').
 * @property {number} width - Valor numérico del ancho de la proporción.
 * @property {number} height - Valor numérico del alto de la proporción.
 */
export const landscapeSizes: LandscapeSize[] = [
  {
    name: '2:1',
    width: 2,
    height: 1,
  },
  {
    name: '16:9',
    width: 16,
    height: 9,
  },
  {
    name: '3:2',
    width: 3,
    height: 2,
  },
  {
    name: '4:3',
    width: 4,
    height: 3,
  },
  {
    name: '5:4',
    width: 5,
    height: 4,
  },
  {
    name: '1:1',
    width: 1,
    height: 1,
  },
]
