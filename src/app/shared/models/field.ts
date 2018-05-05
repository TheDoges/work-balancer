import { Serializable } from '../interfaces/Serializable';
export class Field implements Serializable<Field, RawField, RawField> {
    id?: string;
    name: string;
    type: string;

    deserialize(input: RawField): Field {
        this.id = input.id;
        this.name = input.name;
        this.type = input.type;
        return this;
    }
    serialize(): RawField {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
        };
    }
}

export interface RawField {
    id?: string;
    name: string;
    type: string;
}
