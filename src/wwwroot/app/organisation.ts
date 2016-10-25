import { ModelBase } from './model-base';

export class Organisation extends ModelBase{
    id: number;
    name: string;

    static url: string = "api/organisation";
}
