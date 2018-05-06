import { Serializable } from '../interfaces/Serializable';
export class Semester implements Serializable<Semester, RawSemester, RawSemester> {
    id?: string;
    name: string;
    year: string;
    template: Semester;
    
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
            year: this.year,
            template_id: this.template? this.template.id : null
        }
    }
}

export interface RawSemester {
    id?: string;
    name: string;
    year: string;
    template_id: string;
}
