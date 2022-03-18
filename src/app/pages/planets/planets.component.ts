import { Component, ElementRef, OnInit  } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Planet } from '../../models/planets.model';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @ViewChild(MatSort) sort: MatSort;

  subscription;
  dataSource = new MatTableDataSource<Planet>();
  dataCopy: Planet[];
  dataLoaded = false;

  displayedColumns = [
    'name',
    'population',
    'terrain',
    'climate',
    'gravity'
  ];

  constructor(private dataService: DataService, private decimalPipe: DecimalPipe) {

    this.subscription = this.dataService.getDataSet('planets').subscribe((data) => {
      this.dataSource.data = data.results as Planet[];
      // Added an ID to data items
      this.dataSource.data.forEach((item, index) => item.id = index);
      this.dataSource.data.map((item) => {
        if(item.population != 'unknown'){
          item.population =  this.decimalPipe.transform(Number(item.population), '1.0');
        }
      });

      this.dataCopy = this.dataSource.data;
      this.dataLoaded = true;
    });
  }

  ngOnInit(): void {
  }

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
    this.dataSource.data = this.dataService.filterDataResults(this.dataSource.data, filterValue);
  }

  populateTooltip(column, row) {
    return row[column];
  }
}
