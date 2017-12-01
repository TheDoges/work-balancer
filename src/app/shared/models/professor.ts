import Job from './job';
import { Serializable } from '../interfaces/Serializable';
export default class Professor implements Serializable<Professor> {
    name: string;

    deserialize(input: any): Professor {
        this.name = input.name;
        return this;
    }
    serialize(): Object {
        return {
            name: this.name,
        };
    }
}
