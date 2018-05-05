import { Serializable } from '../interfaces/Serializable';
export class Semester implements Serializable<Semester, RawSemester, RawSemester> {
    id?: string;
    name: string;
    year: string;
    
    deserialize(input: RawSemester): Semester {
        this.id = input.id;
        this.name = input.name;
        this.year = input.year;
        return this;
    }
    serialize(): RawSemester {
        return {
            id: this.id,
            name: this.name,
            year: this.year
        }
    }
}

export interface RawSemester {
    id?: string;
    name: string;
    year: string;
}
