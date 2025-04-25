/**
 * Representa un elemento con información de medios y dimensiones.
 *
 * @property {_id} string - Identificador único del elemento.
 * @property {media} string - URL o ruta del recurso multimedia asociado al elemento.
 * @property {width} number - Ancho del elemento en píxeles.
 * @property {height} number - Alto del elemento en píxeles.
 */
export interface Item {
  _id: string;
  media: string;
  width: number;
  height: number;
}