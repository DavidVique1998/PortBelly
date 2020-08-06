import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoPromocion'
})
export class TipoPromocionPipe implements PipeTransform {

  transform(tipoProm: boolean, ...args: unknown[]): string {
    if (tipoProm){
      return 'Cantidad';
    }
    else{
      return 'Porcentage';
    }
  }

}
