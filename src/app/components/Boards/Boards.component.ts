import { CommonModule } from '@angular/common'
import { httpResource } from '@angular/common/http'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core'
import { RouterLink } from '@angular/router'
import { Board } from '@app/models/board'
import { TimePipe } from '@app/pipes/time.pipe'
import { BoardService } from '@app/services/board.service'
import { ImageComponent } from '../Image/Image.component'

@Component({
  selector: 'app-boards',
  imports: [CommonModule, RouterLink, TimePipe, ImageComponent],
  templateUrl: './Boards.component.html',
  styleUrl: './Boards.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent {
  private readonly _boardService = inject(BoardService)

  public $userId = input<string | null>(null)

  public $resource = httpResource<Board[]>(() =>
    this._boardService.getBoardByUserId(this.$userId()!),
  )
}
