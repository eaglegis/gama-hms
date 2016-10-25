import { ModelBase } from './model-base';

export class Individual extends ModelBase{
//    id: number;
    employeeId: number;

    firstName: string;
    lastName: string;
    weightKgs: number;

    profileImageId: number;

    placeOfHire: string;
    positionTitle: string;

    fitToWork: boolean;
    preEmploy: boolean;
    certified: boolean;

    tribe: string;
    clan: string;
    village: string;

    organisationId: number;
    workPlaceId: number;
    departmentId: number;
    crewId: number;

    static url: string = "api/individual";
}
