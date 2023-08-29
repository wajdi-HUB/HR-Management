import { StatusOfDemand } from './conge';
import { User } from './user';

export class Conversion {
    id!: number;
    conversionType!: TypeOfConversion;
    status!: StatusOfDemand;
    requestDate!: any;
    user!: User;
}

export enum TypeOfConversion {
    ARGENT = 'ARGENT',
    SOLDE = 'SOLDE',
}
