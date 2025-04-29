import { withDevtools } from '@angular-architects/ngrx-toolkit'
import { computed } from '@angular/core'
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals'

interface EditorState {
  selectedLayer: string
  textOptions: {
    text: string
    fontSize: number
    color: string
    top: number
    left: number
  }
  canvasOptions: {
    height: number
    orientation: string
    size: string
    backgroundColor: string
  }
}

const initialState: EditorState = {
  selectedLayer: 'canvas',
  textOptions: {
    text: '',
    fontSize: 48,
    color: '#000000',
    top: 48,
    left: 0,
  },
  canvasOptions: {
    height: 0,
    orientation: '',
    size: 'original',
    backgroundColor: '#008080',
  },
}

export const EditorStore = signalStore(
  { providedIn: 'root' },
  withState<EditorState>(initialState),
  withDevtools('editor'),
  withMethods((store) => ({
    setSelectedLayer(newLayer: string): void {
      patchState(store, { selectedLayer: newLayer })
    },
    setTextOptions(newOptions: EditorState['textOptions']): void {
      patchState(store, { textOptions: newOptions })
    },
    addText(): void {
      patchState(store, {
        textOptions: {
          text: 'Add text',
          fontSize: 48,
          color: '#000000',
          top: 48,
          left: 0,
        },
      })
    },
    setCanvasOptions(newOption: EditorState['canvasOptions']): void {
      patchState(store, { canvasOptions: newOption })
    },
    resetStore(): void {
      patchState(store, initialState)
    },
  })),
  withComputed((store) => ({
    $selectedLayer: computed(() => store.selectedLayer()),
    $textOptions: computed(() => store.textOptions()),
    $canvasOptions: computed(() => store.canvasOptions()),
  })),
)
