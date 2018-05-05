import { Serializable } from '../interfaces/Serializable';
import Job from './job';
export default class Class implements Serializable<Class, any, any> {
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

    deleteJob(job: number | Job) {
        if (job instanceof Job) {
            this.hours -= job.hours;
            this.jobs = this.jobs.filter(item => item !== job);
        } else {
            this.hours -= this.jobs[job].hours;
            this.jobs.splice(job, 1);
        }
    }

    updateJob(index: number, job: Job) {
        this.hours -= this.jobs[index].hours;
        this.jobs[index] = job;
        this.hours += job.hours;
    }
}
