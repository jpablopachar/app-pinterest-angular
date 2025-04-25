import { computed, inject } from '@angular/core'
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'

interface User {
  _id: string;
  displayName: string;
  email: string;
  username: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
  __v: number;
}

interface AuthState {
  currentUser: User | null;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>({ currentUser: null }),
  withMethods((store) => ({
    setCurrentUser(user: User): void {
      patchState(store, { currentUser: user });
    },
    removeCurrentUser(): void {
      patchState(store, { currentUser: null });
    },
    updateCurrentUser(updatedUser: User): void {
      patchState(store, { currentUser: updatedUser });
    },
  }))
);

export const currentUser = () => {
  const authStore = inject(AuthStore);

  return computed(() => authStore.currentUser);
};
