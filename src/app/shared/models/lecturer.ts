import { Serializable } from '../interfaces/Serializable';
import { Field, RawField } from './field'
import { Degree, RawDegree } from './degree';
import { Title, RawTitle } from './title';
import { Link } from './link';
import { SubjectType } from './subject';

export class Lecturer implements Serializable<Lecturer, InputLecturer, OutputLecturer> {
    id?: string;
    name: string;
    surname: string;
    title: Title;
    links?: Link[] = [];
    linkHours: number = 0;
    
    deserialize(input: InputLecturer): Lecturer {
        this.id = input.id.toString();
        this.name = input.name;
        this.surname = input.surname;
        this.title = new Title().deserialize(input.title);
        return this;
    }
    serialize(): OutputLecturer {
        return {
            id: ~~this.id,
            name: this.name,
            surname: this.surname,
            title_id: this.title? this.title.id : null
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

    hasPermission(type: SubjectType) {
        return this.title.permissions.includes(type);
    }

    clearLinks() {
        this.links = [];
        this.linkHours = 0;
    }

    hasMinWarning() {
        return this.linkHours <= (this.title.min_hours + this.title.warning_percent * 0.01 * this.title.min_hours);
    }
    
    hasMinError() {
        return this.linkHours < this.title.min_hours;
    }

    hasMaxWarning() {
        return this.linkHours >= (this.title.max_hours - this.title.warning_percent * 0.01 * this.title.max_hours);
    }
    
    hasMaxError() {
        return this.linkHours > this.title.max_hours;
    }
}

export interface InputLecturer {
    id?: number;
    name: string;
    surname: string;
    title: RawTitle;
}

export interface OutputLecturer {
    id?: number;
    name: string;
    surname: string;
    title_id: string;
}