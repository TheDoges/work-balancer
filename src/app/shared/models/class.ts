import { Serializable } from '../interfaces/Serializable';
import Job from './job';
export default class Class implements Serializable<Class> {
    name: string;
    total: number;
    hours: number;
    private jobs: Job[];

    deserialize(input: any): Class {
        this.name = input.name;
        this.total = input.total;
        this.jobs = input.jobs ? input.jobs.map(job => new Job().deserialize(job)) : [];
        this.hours = this.jobs.reduce((sum: number, job) => sum + job.hours, 0);
        return this;
    }
    serialize(): Object {
        return {
            name: this.name,
            total: this.total,
            jobs: this.jobs.map(job => job.serialize())
        };
    }
    getJobs(): Job[] {
        return this.jobs;
    }

    addJob(job: Job) {
        this.jobs.push(job);
        this.hours += job.hours;
    }

    deleteJob(index: number) {
        this.hours -= this.jobs[index].hours;
        this.jobs.splice(index, 1);
    }

    updateJob(index: number, job: Job) {
        this.hours -= this.jobs[index].hours;
        this.jobs[index] = job;
        this.hours += job.hours;
    }
}
