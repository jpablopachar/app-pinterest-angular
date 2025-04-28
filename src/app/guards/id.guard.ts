import { inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
  type CanActivateFn,
} from '@angular/router'

/**
 * Guard de ruta que verifica la existencia y validez del parámetro 'id' en la ruta.
 *
 * Si el parámetro 'id' no existe o está vacío, redirige a la página.
 * Si el parámetro 'id' es válido, permite el acceso a la ruta.
 *
 * @param route Snapshot de la ruta activada, utilizado para obtener los parámetros de la ruta.
 * @returns `true` si el parámetro 'id' es válido, o un `UrlTree` para redirigir a la página principal en caso contrario.
 */
export const idGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
): boolean | UrlTree => {
  const router = inject(Router)
  const id = route.paramMap.get('id')

  if (!id || id.trim() === '') {
    return router.createUrlTree([''])
  }

  return true
}
