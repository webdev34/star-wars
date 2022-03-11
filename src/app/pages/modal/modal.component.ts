
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Optional } from '@angular/core';
import { StarShip } from '../../models/starship.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  form: FormGroup;
  test: string;
  dataObj: StarShip;

  constructor(
    private fb: FormBuilder,
    public modalRef: MatDialogRef<ModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: StarShip
  ) {

    this.dataObj = data;

    this.form = new FormGroup({
      name: new FormControl({ value: null, disabled: true }),
      model: new FormControl({ value: null, disabled: true }),
      cost_in_credits: new FormControl({ value: null, disabled: true }),
      starship_class: new FormControl({ value: null, disabled: true }),
      passengers: new FormControl({ value: null, disabled: true }),
      manufacturer: new FormControl({ value: null, disabled: true }),
      max_atmosphering_speed: new FormControl({ value: null, disabled: true }),
      length: new FormControl({ value: null, disabled: true }),
      hyperdrive_rating: new FormControl({ value: null, disabled: true }),
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  close(): void {
    this.modalRef.close();
  }
}
