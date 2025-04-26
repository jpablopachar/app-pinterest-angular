import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-button',
  imports: [],
  templateUrl: './UserButton.component.html',
  styleUrl: './UserButton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent { }
