import { Serializable } from '../interfaces/Serializable';
import { Lecturer } from './lecturer';
import { Subject } from './subject';

export class Link implements Serializable<Link, RawLink, RawLink> {
    id?: string;
    lecturer_id: string;
    subject_id: string;
    hours: number;
    lecturer?: Lecturer;
    subject?: Subject;
    
    deserialize(input: RawLink): Link {
        this.id = input.id.toString();
        this.lecturer_id = input.lecturer_id.toString();
        this.subject_id = input.subject_id.toString();
        this.hours = input.hours;
        return this;
    }
    serialize(): RawLink {
        return {
            id: +this.id,
            lecturer_id: this.lecturer? +this.lecturer.id : +this.lecturer_id,
            subject_id: this.subject? +this.subject.id : +this.subject_id,
            hours: this.hours
        };
    }
}

export interface RawLink {
    id?: number;
    lecturer_id: number;
    subject_id: number;
    hours: number;
}