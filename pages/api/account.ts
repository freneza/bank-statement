import { NextApiRequest, NextApiResponse } from 'next';

import * as fromRepository from '../../repositories/account-repository';
import * as fromValidator from '../../validations/account-validator';
import { CreateAccountPayload } from '../../interfaces/models';
import {
  ErrorApiResponse,
  SuccessApiResponse,
} from '../../interfaces/api-responses';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessApiResponse | ErrorApiResponse>
): Promise<void> => {
  switch (req.method) {
    case 'POST':
      await createNewAccount(req, res);
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

async function createNewAccount(
  req: NextApiRequest,
  res: NextApiResponse<SuccessApiResponse | ErrorApiResponse>
): Promise<void> {
  const createAccountPayload: CreateAccountPayload = {
    name: req.body.name,
    age: req.body.age,
    initialAmount: req.body.initialAmount,
  };

  const payloadValidation = fromValidator.validate(createAccountPayload);

  if (!payloadValidation.isValid) {
    res.status(400).json({
      error: payloadValidation.messages.join(', '),
    } as ErrorApiResponse);

    return;
  }

  const newAccount = await fromRepository.createAccount(createAccountPayload);
  res.status(200).json({ data: newAccount } as SuccessApiResponse);
}
