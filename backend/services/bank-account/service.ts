import { BankAccountCreationParams } from '../../domains/bank-account/events';
import { BankAccountStream } from '../../domains/bank-account/streams/BankAccountStream';

async function create(
  payload: BankAccountCreationParams
): Promise<BankAccountStream> {
  const data: BankAccountCreationParams = {
    ...payload,
    number: generateAccountNumber(),
  };

  const account = BankAccountStream.create(data);

  return account;
}

async function deactivate(id: string): Promise<BankAccountStream> {
  const account = await findById(id);

  //if (account.isDeactvated) throw new Error('Account already deactvated.');

  //account.deactivate();

  //repository.save(account);

  return account;
}

async function makeTransaction(
  id: string,
  value: number
): Promise<BankAccountStream> {
  const account = await findById(id);

  //if (account.isDeactvated) throw new Error('Account already deactvated.');
  if (value === 0) throw new Error('Value must not be zero.');

  //if (value > 0) account.deposit(value);
  //if (value < 0) account.withdraw(value);

  //repository.save(account);

  return account;
}

async function findById(id: string): Promise<BankAccountStream> {
  const account = BankAccountStream.get(id);

  if (!account) throw new Error(`Account not found with given ID ${id}`);

  return account;
}

function generateAccountNumber() {
  return (Math.floor(Math.random() * 90000) + 10000).toString();
}

export { create, deactivate, findById, makeTransaction };
