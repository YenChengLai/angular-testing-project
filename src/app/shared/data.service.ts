import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  getDetails() {
    const resultPromise = new Promise((res, rej) => {
      setTimeout(() => {
        res('Data');
      }, 1500);
    });
    return resultPromise;
  }
}
