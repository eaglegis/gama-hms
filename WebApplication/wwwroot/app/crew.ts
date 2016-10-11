import { ModelBase } from './model-base';

export class Crew extends ModelBase{
    id: number;
    name: string;

    static url: string = "api/crew";
}
