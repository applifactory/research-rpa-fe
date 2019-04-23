import { AlertType } from './alert-type';

export interface Alert {
  id: string;
  message: string;
  type: AlertType;
}