import { ModelBase } from './model-base';

export class Individual extends ModelBase{
//    id: number;
    firstName: string;
    lastName: string;
    weightKgs: number;

    profileImageId: number;

    tribe: string;
    clan: string;
    village: string;

    static url: string = "api/individual";
}
