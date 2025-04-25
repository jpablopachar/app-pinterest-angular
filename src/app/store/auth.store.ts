import { computed, inject } from '@angular/core'
import { AuthResponse } from '@app/models/auth/auth'
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'

interface AuthState {
  currentUser: AuthResponse | null;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>({ currentUser: null }),
  withMethods((store) => ({
    setCurrentUser(user: AuthResponse): void {
      patchState(store, { currentUser: user });
    },
    removeCurrentUser(): void {
      patchState(store, { currentUser: null });
    },
    updateCurrentUser(updatedUser: AuthResponse): void {
      patchState(store, { currentUser: updatedUser });
    },
  }))
);

export const currentUser = () => {
  const authStore = inject(AuthStore);

  return computed(() => authStore.currentUser);
};
