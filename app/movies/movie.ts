import {Rating} from './rating';

export interface Movie {
  id: number,
  name: string,
  description: string,
  collapsed: boolean,
  rating?: Rating
}
