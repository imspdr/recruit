import { runInAction, makeAutoObservable } from "mobx";
import { Job } from "./types";
import jobs from "./jobs.json";

export class RootStore {
  width: number;
  wholeJobs: Job[];

  constructor() {
    this.width = 300;
    this.wholeJobs = jobs;
    makeAutoObservable(this);
  }

  setWidth = (width: number) => {
    runInAction(() => {
      this.width = width;
    });
  };
}
