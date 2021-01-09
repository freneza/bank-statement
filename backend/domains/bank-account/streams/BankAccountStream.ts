import { BaseStream } from '../../BaseStream';
import {
  BankAccountCreated,
  BankAccountCreationParams
} from '../events';

export class BankAccountStream extends BaseStream {
  number: string | null = null;

  constructor(number: string) {
      super('BankAccount' + number);
      this.number = number;
  }

  static create(params: BankAccountCreationParams): BankAccountStream {
    const account = new BankAccountStream(params.number);

    account.pushNewEvents(
      new BankAccountCreated({
        ...params
      }),
    );

    return account;
  }

  static get(number: string): BankAccountStream {
    return new BankAccountStream(number);
  }

}
