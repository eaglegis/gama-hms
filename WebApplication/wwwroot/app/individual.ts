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

    url():string{ return "individual"};
    public static url2():string{ return "individual"};
    public  static url3: string = "individual";
}
