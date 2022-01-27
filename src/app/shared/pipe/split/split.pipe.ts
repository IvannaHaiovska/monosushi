import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { strictEqual } from 'assert';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: string, index: number) {
    return `${value.split('.')[index]}.`;
  }
}
