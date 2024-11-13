import { Subject } from 'subjecto';

export const auth = {
  $token: new Subject<string>(''),
};