import { runInAction, makeAutoObservable } from "mobx";
import { Job, Company, COMPANYS } from "./types";
import jobs from "./data.json";

export class RootStore {
  width: number;
  height: number;
  wholeJobs: Job[];
  searchText: string;
  // selectedTags: Tag[];
  selectedCompanies: Company[];

  constructor() {
    this.width = 1000;
    this.height = 1000;
    this.wholeJobs = jobs;
    this.searchText = "";
    // this.selectedTags = [];
    this.selectedCompanies = COMPANYS;
    makeAutoObservable(this);
  }

  getJobs = () => {
    return this.wholeJobs.filter((job: Job) => {
      return (
        job.title
          .toLowerCase()
          .includes(this.searchText.replace(/[^\uAC00-\uD7A3a-zA-Z0-9\s]/g, "").toLowerCase()) &&
        this.selectedCompanies.includes(job.company)
      );
    });
  };

  setWidth = (width: number) => {
    runInAction(() => {
      this.width = width;
    });
  };
  setHeight = (height: number) => {
    runInAction(() => {
      this.height = height;
    });
  };

  setSearchText = (text: string) => {
    runInAction(() => {
      this.searchText = text;
    });
  };

  // addTag = (tag: Tag) => {
  //   runInAction(() => {
  //     if (!this.selectedTags.includes(tag)) {
  //       this.selectedTags = [...this.selectedTags, tag];
  //     }
  //   });
  // };

  // removeTag = (givenTag: Tag) => {
  //   runInAction(() => {
  //     this.selectedTags = this.selectedTags.filter((tag) => tag != givenTag);
  //   });
  // };

  toggleCompany = (company: Company) => {
    runInAction(() => {
      if (!this.selectedCompanies.includes(company)) {
        this.selectedCompanies = [...this.selectedCompanies, company];
      } else {
        this.selectedCompanies = this.selectedCompanies.filter((com) => com != company);
      }
    });
  };
  toggleAllCompany = () => {
    runInAction(() => {
      if (this.selectedCompanies.length > 0) {
        this.selectedCompanies = [];
      } else {
        this.selectedCompanies = COMPANYS;
      }
    });
  };
}
