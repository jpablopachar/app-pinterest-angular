import { Injectable } from '@angular/core'

/**
 * Servicio para gestionar el almacenamiento local (localStorage) en la aplicación.
 *
 * Proporciona métodos genéricos para guardar, cargar y eliminar datos en el almacenamiento local
 * utilizando claves específicas. Permite serializar y deserializar objetos de cualquier tipo,
 * facilitando la persistencia de información en el navegador.
 *
 * @remarks
 * Este servicio utiliza `localStorage` del navegador, por lo que los datos persistirán
 * incluso después de recargar la página o cerrar el navegador, hasta que sean eliminados explícitamente.
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Guarda un valor en el almacenamiento local bajo la clave especificada.
   *
   * @template T - Tipo de dato del valor a guardar.
   * @param {string} key - Clave bajo la cual se almacenará el valor.
   * @param {T} value - Valor a guardar en el almacenamiento local.
   */
  public save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * Carga y deserializa un valor almacenado en el localStorage bajo la clave especificada.
   *
   * @template T El tipo de dato esperado al recuperar el valor.
   * @param {string} key La clave asociada al valor en el localStorage.
   * @returns {(T | null)} El valor deserializado de tipo T si existe, o null si no se encuentra la clave.
   */
  public load<T>(key: string): T | null {
    const value = localStorage.getItem(key)

    return value ? JSON.parse(value) : null
  }

  /**
   * Elimina un elemento del almacenamiento local (localStorage) utilizando la clave proporcionada.
   *
   * @param key - La clave del elemento que se desea eliminar del almacenamiento local.
   */
  public remove(key: string): void {
    localStorage.removeItem(key)
  }
}
