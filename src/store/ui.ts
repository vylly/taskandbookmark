import { Subject } from 'subjecto';

export const ui = {
  $showLinks: new Subject<boolean>(true),
  $showNotes: new Subject<boolean>(true),
};