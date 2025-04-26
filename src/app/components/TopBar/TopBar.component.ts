import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { ImageComponent } from '../Image/Image.component'
import { UserButtonComponent } from '../UserButton/UserButton.component'

@Component({
  selector: 'app-top-bar',
  imports: [ImageComponent, UserButtonComponent],
  template: `
    <div class="topBar">
      <form (submit)="handleSubmit($event)" class="search">
        <app-image [$src]="'/general/search.svg'" [$alt]="''" />
        <input type="text" placeholder="Search" />
      </form>
      <app-user-button />
    </div>
  `,
  styles: [
    `
      .topBar {
        margin: 16px 0px;
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .search {
        flex: 1;
        background-color: #f1f1f1;
        border-radius: 16px;
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .search input {
        flex: 1;
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 18px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  private _router = inject(Router);

  /**
   * Maneja el evento de envío de un formulario de búsqueda.
   *
   * Previene el comportamiento por defecto del formulario, obtiene el valor ingresado
   * en el primer campo de entrada del formulario y navega a la ruta de búsqueda
   * utilizando el valor proporcionado.
   *
   * @param event El evento de envío del formulario (SubmitEvent).
   */
  public handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const value = ((event.target as HTMLFormElement)[0] as HTMLInputElement)
      .value;

    this._router.navigate([`/search?search=${value}`]);
  }
}
