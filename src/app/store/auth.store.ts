import { withDevtools } from '@angular-architects/ngrx-toolkit'
import { computed, inject } from '@angular/core'
import { AuthResponse } from '@app/models/auth'
import { StorageService } from '@app/services/storage.service'
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals'

interface AuthState {
  currentUser: AuthResponse | null
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>({ currentUser: null }),
  withDevtools('auth'),
  withMethods((store, storageService = inject(StorageService)) => ({
    setCurrentUser(user: AuthResponse): void {
      patchState(store, { currentUser: user })

      storageService.save('currentUser', user)
    },
    removeCurrentUser(): void {
      patchState(store, { currentUser: null })

      storageService.remove('currentUser')
    },
    updateCurrentUser(updatedUser: AuthResponse): void {
      patchState(store, { currentUser: updatedUser })

      storageService.save('currentUser', updatedUser)
    },
    loadCurrentUser(): void {
      const persistedUser = storageService.load<AuthResponse>('currentUser')

      if (persistedUser) {
        patchState(store, { currentUser: persistedUser })
      }
    }
  })),
  withComputed((store) => ({
    $currentUser: computed(() => store.currentUser()),
  })),
)
