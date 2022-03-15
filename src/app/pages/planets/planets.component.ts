import { Component, ElementRef, OnInit  } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Planet } from '../../models/planets.model';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @ViewChild(MatSort) sort: MatSort;

  subscription;
  positionOptions: TooltipPosition[] = ['below'];
  position = new FormControl(this.positionOptions[0]);
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

  constructor(private dataService: DataService) {

    this.subscription = this.dataService.getDataSet('planets').subscribe((data) => {
      this.dataSource.data = data.results as Planet[];
      for (let i = 0; i < this.dataSource.data.length; i++) {
        this.dataSource.data[i].id = i;
      }

      this.dataCopy = this.dataSource.data;
      this.dataLoaded = true;
    });
  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    let inputField: HTMLElement = <HTMLElement>(
      document.querySelectorAll('#search')[0]
    );
    inputField && inputField.focus();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(event: Event) {
    this.dataSource.data = this.dataCopy;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.data = this.dataService.filterDataResults(this.dataSource.data, filterValue);
  }
}
