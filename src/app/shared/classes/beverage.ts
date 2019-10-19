export class Beverage {
    code: string;
    name: string;
    description: string;
    type: string;
    listOfSizes: any[];
    constructor(code?: string, name?: string, description?: string, type?: string, listOfSizes?: any[]) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.type = type;
        this.listOfSizes = listOfSizes;
    }

    setBeverageDetail(beverage: any) {
        this.name = beverage.name;
        this.description = beverage.description;
        this.type = beverage.type;
        this.listOfSizes = beverage.list_of_size;
    }
}
