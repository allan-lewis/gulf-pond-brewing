export enum BrewType {
    AllGrain,
    Extract
}

export class BrewhouseModel {
    brewType: BrewType;
    batchSize: number;
    efficiency: number;
}