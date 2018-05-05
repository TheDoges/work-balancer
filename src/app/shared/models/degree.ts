import { Serializable } from '../interfaces/Serializable';
export class Degree implements Serializable<Degree, RawDegree, RawDegree> {
    id?: string;
    name: string;
    prefix: string;
    alias: string;
    number: number;

    deserialize(input: RawDegree): Degree {
        this.id = input.id;
        this.name = input.name;
        this.prefix = input.prefix;
        this.alias = input.alias;
        this.number = input.number;
        return this;
    }
    serialize(): RawDegree {
        return {
            id: this.id,
            name: this.name,
            prefix: this.prefix,
            alias: this.alias,
            number: this.number,
        };
    }
}

export interface RawDegree {
    id?: string;
    name: string;
    prefix: string;
    alias: string;
    number: number;
}
