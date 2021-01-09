import { Transaction } from '../../value-objects/Transaction';

export class BankAccount {
  number: string | null = null;
  userIdentifier: string | null = null;
  userName: string | null = null;
  userBirthDate: Date | null = null;
  createdAt: Date | null = null;
  deactivatedAt: Date | null = null;
  transactions: Transaction[] = [];

  constructor() {
  }

  get isDeactvated(): boolean {
    return !!this.deactivatedAt;
  }

  private getBalance(transactions: Transaction[]): number {
    if (!transactions.length) return 0;

    return transactions
      .map((transaction) => transaction.value)
      .reduce((prev, current) => prev + current, 0);
  }
}
