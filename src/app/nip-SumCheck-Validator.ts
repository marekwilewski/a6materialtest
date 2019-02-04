import {  FormControl } from '@angular/forms';

export class NipSumValidator {

  static nipSumValidator(input: FormControl): { [key: string]: any } {
    // tslint:disable-next-line:prefer-const
    let nip: string = input.value;
    // tslint:disable-next-line:prefer-const
    let checksum = (6 * parseInt(nip[0], 10)
                  + 5 * parseInt(nip[1], 10)
                  + 7 * parseInt(nip[2], 10)
                  + 2 * parseInt(nip[3], 10)
                  + 3 * parseInt(nip[4], 10)
                  + 4 * parseInt(nip[5], 10)
                  + 5 * parseInt(nip[6], 10)
                  + 6 * parseInt(nip[7], 10)
                  + 7 * parseInt(nip[8], 10)) % 11;

    return (parseInt(nip[9], 10) === checksum ? null : ['NIP - zła suma kontrolna']);
  }
}
