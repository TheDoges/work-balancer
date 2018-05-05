import { Serializable } from '../interfaces/Serializable';
import { Field, RawField } from './field'
import { Degree, RawDegree } from './degree';
import { Title, RawTitle } from './title';
import { Link } from './link';

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