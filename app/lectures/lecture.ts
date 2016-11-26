import {IRating} from './rating';

export interface Lecture {
  id: number,
  name: string,
  description: string,
  collapsed: boolean,
  rating?: IRating []
}
