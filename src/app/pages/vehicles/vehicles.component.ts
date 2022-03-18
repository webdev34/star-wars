import { Component, ElementRef, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { DataService } from '../../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @ViewChild(MatSort) sort: MatSort;

  subscription;
  dataSource = new MatTableDataSource<Vehicle>();
  dataCopy: Vehicle[];
  displayedColumns = [
    'name',
    'model',
    'manufacturer',
    'passengers',
    'vehicle_class',
  ];
  dataLoaded = false;

  constructor(private dataService: DataService) {
    this.subscription = this.dataService
      .getDataSet('vehicles')
      .subscribe((data) => {
        this.dataSource.data = data.results as Vehicle[];
         // Added an ID to data items
        this.dataSource.data.forEach((item, index) => item.id = index);
        this.dataCopy = this.dataSource.data;
        this.dataLoaded = true;
      });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    //Needed since ASYNC pipe would affect how Material tables NgChanges functions
    this.subscription.unsubscribe();
  }

  applyFilter(event: Event) {
    this.dataSource.data = this.dataCopy;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.data = this.dataService.filterDataResults(
      this.dataSource.data,
      filterValue
    );
  }

  populateTooltip(column, row) {
    return row[column];
  }
}
