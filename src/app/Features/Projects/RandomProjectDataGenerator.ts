import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import crypto from 'crypto';

export function generateUser() {
  let name;

  do {
    name = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      separator: '',
      style: 'lowerCase',
    });
  } while (name.length < 6 || name.length > 12);

  const ownerId = crypto.randomBytes(5).toString('hex');

  return { name, ownerId };
}

