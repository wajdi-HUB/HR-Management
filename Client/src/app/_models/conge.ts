import { User } from './user';

export class Conge {
    id?: number;
    duree!: number;
    soldeConge!: number;
    dateDebut!: any;
    dateFin!: any;
    status!: StatusOfDemand;
    user!: User;
}

export enum StatusOfDemand {
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    NOT_YET_TREATED = 'NOT_YET_TREATED',
}
