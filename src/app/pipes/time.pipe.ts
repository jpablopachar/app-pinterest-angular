import { Pipe, type PipeTransform } from '@angular/core'
import { formatDistanceToNow } from 'date-fns'

@Pipe({
  name: 'appTime',
})
export class TimePipe implements PipeTransform {
  transform(value: Date | string): string {
    return formatDistanceToNow(new Date(value), { addSuffix: true })
  }
}
