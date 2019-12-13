import { BeverageSize } from './models/beverage-size';

export class Beverage {
    code: string;
    name: string;
    description: string;
    type: string;
    listOfSizes: BeverageSize[];
    image_link: string;
    constructor(code?: string, name?: string, description?: string, type?: string, listOfSizes?: any[], image_link? : string) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.type = type;
        this.listOfSizes = listOfSizes;
        this.image_link = image_link;
    }

    setBeverageDetail(beverage: any) {
        this.name = beverage.name;
        this.description = beverage.description;
        this.type = beverage.type;
        this.listOfSizes = beverage.list_of_size;
        this.image_link = beverage && beverage.image_link ? beverage.image_link : 'https://image.flaticon.com/icons/png/512/175/175782.png';
    }
}
