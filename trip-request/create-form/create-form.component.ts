import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material";
import { DataService } from "./data.service";

@Component({
  selector: "app-create-form",
  templateUrl: "./create-form.component.html",
  styleUrls: ["./create-form.component.css"]
})
export class CreateFormComponent implements OnInit {
  tripForm = this.fb.group({
    pickUpPoint: [""],
    dropOfPoint: [""]
  });
  message: string;

  constructor(
    private fb: FormBuilder,
    private bottomSheet: MatBottomSheet,
    private data: DataService
  ) {}

  ngOnInit() {
    this.data.pickUpPointSelected.subscribe(message => {
      this.tripForm.controls.pickUpPoint.setValue(message);
    });
    this.data.dropOfPointSelected.subscribe(message => {
      console.log(message);
      this.tripForm.controls.dropOfPoint.setValue(message);
    });
  }

  openBottomSheet(message: string): void {
    this.data.bottomSheetIsCalledBy(message);
    this.bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
}

@Component({
  templateUrl: "./bottom-sheet-overview-example-sheet.html",
  styleUrls: ["./bottom-sheet-overview-example-sheet.css"]
})
export class BottomSheetOverviewExampleSheet {
  tripForm = this.fb.group({
    mainLocation: [""],
    subLocation: [""]
  });
  constructor(
    private fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
    private data: DataService
  ) {
    this.data.currentlyCalled.subscribe(message => console.log(message));
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    this.data.currentlyCalled.subscribe(message => {
      console.log(message, "here");

      if (message == "1") {
        this.setPickUpPoint();
      } else if (message == "2") {
        this.setDropOfPoint();
      }
    });

    // event.preventDefault();
  }

  options: string[] = [
    "One",
    "Two",
    "Three",
    "One",
    "Two",
    "Three",
    "One",
    "Two",
    "Three",
    "One",
    "Two",
    "Three",
    "One",
    "Two",
    "Three"
  ];
  setPickUpPoint() {
    this.data.pickUpSelected(
      this.tripForm.controls.subLocation.value +
        "," +
        this.tripForm.controls.mainLocation.value
    );
  }
  setDropOfPoint() {
    this.data.dropOfSelected(
      this.tripForm.controls.subLocation.value +
        "," +
        this.tripForm.controls.mainLocation.value
    );
  }
}
