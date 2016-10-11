import { ModelBase } from './model-base';

export class WorkPlace extends ModelBase{
    id: number;
    name: string;

    static url: string = "api/workplace";
}
