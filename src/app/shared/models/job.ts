import Class from './class';
import { Serializable } from '../interfaces/Serializable';
import Professor from './professor';
export default class Job implements Serializable<Job, any, any> {
    professor: Professor;
    class: Class;
    hours: number;

    deserialize(input: any): Job {
        this.professor = new Professor().deserialize(input.professor);
        this.hours = input.hours;
        return this;
    }
    serialize(): Object {
        return {
            hours: this.hours,
            professor: this.professor.serialize()
        };
    }
}
