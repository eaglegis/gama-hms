import { ModelBase } from './model-base';

export class Department extends ModelBase{
    id: number;
    name: string;

    static url: string = "api/department";
}
