import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {
  private calledBy = new BehaviorSubject<string>("");
  currentlyCalled = this.calledBy.asObservable();

  private pickUp = new BehaviorSubject<string>("");
  pickUpPointSelected = this.pickUp.asObservable();

  private dropOf = new BehaviorSubject<string>("");
  dropOfPointSelected = this.dropOf.asObservable();

  constructor() {}

  pickUpSelected(message: string) {
    this.pickUp.next(message);
  }
  dropOfSelected(message: string) {
    this.dropOf.next(message);
  }
  bottomSheetIsCalledBy(message: string) {
    this.calledBy.next(message);
  }
}
