import { withDevtools } from '@angular-architects/ngrx-toolkit'
import { computed } from '@angular/core'
import { AuthResponse } from '@app/models/auth'
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
  withMethods((store) => ({
    setCurrentUser(user: AuthResponse): void {
      patchState(store, { currentUser: user })
    },
    removeCurrentUser(): void {
      patchState(store, { currentUser: null })
    },
    updateCurrentUser(updatedUser: AuthResponse): void {
      patchState(store, { currentUser: updatedUser })
    },
  })),
  withComputed((store) => ({
    $currentUser: computed(() => store.currentUser()),
  })),
)
