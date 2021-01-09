import BaseEvent from '../../BaseEvent';

export interface BankAccountCreationParams {
  number: string;
  user: {
    identifier: string;
    name: string;
    birthDate: Date;
  };
}

export class BankAccountCreated extends BaseEvent<
  BankAccountCreationParams
> {

  constructor(data: BankAccountCreationParams) {
    super(data);
  }
}
