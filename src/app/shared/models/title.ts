import { Serializable } from '../interfaces/Serializable';
import { Degree, RawDegree } from './degree';
import { SubjectType } from './subject';

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
    permissions: SubjectType[] = [];
    
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
        if (this.lab_permission) {
            this.permissions.push(SubjectType.lab);
        }
        if (this.lec_permission) {
            this.permissions.push(SubjectType.lec);
        }
        if (this.exe_permission) {
            this.permissions.push(SubjectType.exe);
        }
        if (this.sem_permission) {
            this.permissions.push(SubjectType.sem);
        }
        if (this.pro_permission) {
            this.permissions.push(SubjectType.pro);
        }
        return this;
    }
    serialize(): RawTitle {
        return {
            id: this.id,
            name: this.name,
            short_name: this.short_name,
            full_name: this.full_name,
            lab_permission: this.lab_permission? 1 : 0,
            lec_permission: this.lec_permission? 1 : 0,
            exe_permission: this.exe_permission? 1 : 0,
            sem_permission: this.sem_permission? 1 : 0,
            pro_permission: this.pro_permission? 1 : 0,
            min_hours: this.min_hours,
            max_hours: this.max_hours,
            warning_percent: this.warning_percent
        };
    }

    includesString(needle: string) {
        needle = needle.toLowerCase();
        return ((!!this.name && this.name.toLowerCase().includes(needle)) ||
            (!!this.short_name && this.short_name.toLowerCase().includes(needle)) ||
            (!!this.full_name && this.full_name.toLowerCase().includes(needle)));
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