import { Serializable } from '../interfaces/Serializable';
import { Field, RawField } from './field'
import { Degree, RawDegree } from './degree';
import { Semester, RawSemester } from './semester';
import { Link } from './link';

export class Subject implements Serializable<Subject, InputSubject, OutputSubject> {
    id?: string;
    name: string;
    type: SubjectType;
    hours: number;
    field: Field;
    semester: Semester;
    degree: Degree;
    semesterNumber: number;
    links: Link[] = [];
    linkHours: number = 0;

    deserialize(input: InputSubject): Subject {
        this.id = input.id;
        this.name = input.name;
        this.type = SubjectType[input.type];
        this.hours = input.hours;
        this.field = new Field().deserialize(input.field);
        this.semester = new Semester().deserialize(input.semester);
        this.degree = new Degree().deserialize(input.degree);
        this.semesterNumber = input.semesterNumber;
        return this;
    }
    serialize(): OutputSubject {
        let serializedType: string;
        if (this.type) {
            const subjectTypes = Object.values(SubjectType);
            for(let i = 0; i < subjectTypes.length; i++) {
                if (subjectTypes[i] === this.type) {
                    serializedType = Object.keys(SubjectType)[i];
                    break;
                }
            }
        }
        return {
            id: this.id,
            name: this.name,
            type: serializedType,
            hours: this.hours,
            field_id: this.field? this.field.id : null,
            semester_id: this.semester? this.semester.id : null,
            degree_id: this.degree? this.degree.id : null,
            semesterNumber: this.semesterNumber
        };
    }

    addLink(link: Link) {
        this.linkHours += link.hours;
        this.links.push(link);
    }
    
    removeLink(removedLink: Link) {
        this.links = this.links.filter(link => link.id !== removedLink.id);
        this.linkHours = this.links.reduce((total, link) => total + link.hours, 0);
    }
}

export enum SubjectType {
    lec = "Wykład",
    lab = "Laboratorium"
}

export interface InputSubject {
    id?: string;
    name: string;
    type: string;
    hours: number;
    field: RawField;
    semester: RawSemester;
    degree: RawDegree;
    semesterNumber: number;
}

export interface OutputSubject {
    id?: string;
    name: string;
    type: string;
    hours: number;
    field_id: string;
    semester_id: string;
    degree_id: string;
    semesterNumber: number;
}
