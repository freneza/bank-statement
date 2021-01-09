import BaseEvent from '../../BaseEvent';
import { BankAccount } from '../read/BankAccount';

export interface BankAccountDeactivationParams {
  deactivatedAt: Date;
}

export class BankAccountDeactivatedEvent extends BaseEvent<
  BankAccountDeactivationParams
> {
  static readonly eventName = 'account-deactivated';

  constructor(data: BankAccountDeactivationParams) {
    super(data);
  }

  static commit(
    state: BankAccount,
    event: BankAccountDeactivatedEvent
  ): BankAccount {
    state.deactivatedAt = event.data.deactivatedAt;

    return state;
  }
}
