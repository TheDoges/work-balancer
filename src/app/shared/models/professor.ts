import Job from './job';
import { Serializable } from '../interfaces/Serializable';
export default class Professor implements Serializable<Professor, any, any> {
    name: string;
    jobs: Job[] = [];
    hours = 0;
    minimum = 80;

    deserialize(input: any): Professor {
        this.name = input.name;
        return this;
    }
    serialize(): Object {
        return {
            name: this.name,
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
