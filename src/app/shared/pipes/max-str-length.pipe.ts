import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxStrLength'
})
export class MaxStrLengthPipe implements PipeTransform {

  transform(str: string, maxLength: number = 95): string {
    return str.substring(0, maxLength) + '...';
  }

}
