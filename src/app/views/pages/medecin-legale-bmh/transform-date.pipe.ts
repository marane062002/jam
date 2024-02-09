import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDate'
})
@Pipe({
  name: 'TransformDatePipe'
})
export class TransformDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, format: string): any {
    // Vérifier si la valeur est une date valide
    if (value instanceof Date) {
      // Formater la date en utilisant le DatePipe fourni par Angular
      return this.datePipe.transform(value, format);
    } else {
      // Retourner la valeur d'origine si ce n'est pas une date
      return value;
    }
  }
}
