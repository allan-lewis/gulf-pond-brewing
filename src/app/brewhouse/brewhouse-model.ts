export enum BrewType {
    BIAB,
    Extract
}

export class BrewhouseModel {
    brewType: BrewType;
    batchSize: number;
    efficiency: number;
}