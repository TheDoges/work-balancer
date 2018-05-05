import { Serializable } from '../interfaces/Serializable';
import { Degree, RawDegree } from './degree';

export class Title implements Serializable<Title, RawTitle, RawTitle> {
    id?: string;
    name: string;
    short_name: string;
    full_name: string;
    lab_permission: boolean;
    lec_permission: boolean;
    exe_permission: boolean;
    sem_permission: boolean;
    pro_permission: boolean;
    min_hours: number;
    max_hours: number;
    warning_percent: number;
    
    deserialize(input: RawTitle): Title {
        this.id = input.id;
        this.name = input.name;
        this.short_name = input.short_name;
        this.full_name = input.full_name;
        this.lab_permission = !!input.lab_permission;
        this.lec_permission = !!input.lec_permission;
        this.exe_permission = !!input.exe_permission;
        this.sem_permission = !!input.sem_permission;
        this.pro_permission = !!input.pro_permission;
        this.min_hours = input.min_hours;
        this.max_hours = input.max_hours;
        this.warning_percent = input.warning_percent;
        return this;
    }
    serialize(): RawTitle {
        return {
            id: this.id,
            name: this.name,
            short_name: this.short_name,
            full_name: this.full_name,
            lab_permission: +this.lab_permission,
            lec_permission: +this.lec_permission,
            exe_permission: +this.exe_permission,
            sem_permission: +this.sem_permission,
            pro_permission: +this.pro_permission,
            min_hours: this.min_hours,
            max_hours: this.max_hours,
            warning_percent: this.warning_percent
        };
    }
}

export interface RawTitle {
    id?: string;
    name: string;
    short_name: string;
    full_name: string;
    lab_permission: number;
    lec_permission: number;
    exe_permission: number;
    sem_permission: number;
    pro_permission: number;
    min_hours: number;
    max_hours: number;
    warning_percent: number;
}