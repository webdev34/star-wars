import { Component, ElementRef, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { DataService } from '../../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Vehicle>();
  dataCopy: Vehicle[];
  displayedColumns = [
    'name',
    'model',
    'manufacturer',
    'passengers',
    'vehicle_class'
  ];

  constructor(private dataService: DataService) {
    this.dataService.getDataSet('vehicles').subscribe((data) => {

      this.dataSource.data = data.results as Vehicle[];
      for (let i = 0; i < this.dataSource.data.length; i++) {
        this.dataSource.data[i].id = i;
      }

      this.dataCopy = this.dataSource.data;
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    let inputField: HTMLElement = <HTMLElement>(
      document.querySelectorAll('#search')[0]
    );
    inputField && inputField.focus();
  }

  //COULDVE CREATED A PIPE
  applyFilter(event: Event) {
    this.dataSource.data = this.dataCopy;
    const filterValue = (event.target as HTMLInputElement).value;
    const reg = new RegExp(filterValue, 'i');
    let filteredResults = this.dataSource.filteredData.filter((item) => {
      let flag = false;
      for (const prop in item) {
        if (reg.test(item[prop])) {
          flag = true;
        }
      }

      return flag;
    });

    this.dataSource.data = filteredResults;
  }

  //COULDVE CREATED A PIPE
  checkIfEllipsisIsNeeded(thisValue: string | number) {
    //Needed to convert number to string
    thisValue = thisValue + '';
    return thisValue.length <= 20
      ? thisValue
      : thisValue.substring(0, 20) + '...';
  }
}
