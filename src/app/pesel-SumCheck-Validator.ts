import {  FormControl } from '@angular/forms';

export class PeselSumValidator {

  static peselSumValidator(input: FormControl): { [key: string]: any } {
    // tslint:disable-next-line:prefer-const
    let pesel: string = input.value;
    let checksum = (1 * parseInt(pesel[0], 10)
                  + 3 * parseInt(pesel[1], 10)
                  + 7 * parseInt(pesel[2], 10)
                  + 9 * parseInt(pesel[3], 10)
                  + 1 * parseInt(pesel[4], 10)
                  + 3 * parseInt(pesel[5], 10)
                  + 7 * parseInt(pesel[6], 10)
                  + 9 * parseInt(pesel[7], 10)
                  + 1 * parseInt(pesel[8], 10)
                  + 3 * parseInt(pesel[9], 10)) % 10;
    if (checksum === 0) {
      checksum = 10;
    }
    checksum = 10 - checksum;

    return (parseInt(pesel[10], 10) === checksum ? null : ['peselSumCheck']);
  }

}
