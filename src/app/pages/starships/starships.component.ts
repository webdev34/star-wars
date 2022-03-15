import { Component, ElementRef, OnInit } from '@angular/core';
import { StarShip } from '../../models/starship.model';
import { DataService } from '../../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css'],
})
export class StarshipsComponent implements OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @ViewChild(MatSort) sort: MatSort;

  subscription;
  dataSource = new MatTableDataSource<StarShip>();
  dataCopy: StarShip[];
  displayedColumns = [
    'name',
    'model',
    'manufacturer',
    'passengers',
    'starship_class',
    'view',
    'delete',
  ];
  dataLoaded = false;

  constructor(private dataService: DataService, private modal: MatDialog) {
    this.subscription = this.dataService.getDataSet('starships').subscribe((data) => {
      this.dataSource.data = data.results as StarShip[];
      for (let i = 0; i < this.dataSource.data.length; i++) {
        this.dataSource.data[i].id = i;
      }

      this.dataCopy = this.dataSource.data;
      this.dataLoaded = true;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //COULDVE CREATED A SERVICE FOR THESE FUNCTIONS
  viewRecord(record: any) {
    const modalConfig = new MatDialogConfig();
    modalConfig.data = record;
    this.modal.open(ModalComponent, modalConfig);
  }

  deleteRecord(starShip: any){
    for (let i = 0; i < this.dataCopy.length; i++) {
      if(this.dataCopy[i].id == starShip.id){
        this.dataCopy.splice(i, 1);
        this.dataSource.data = this.dataCopy;
        this.dataSource._updateChangeSubscription();
      }
    }
  }

  applyFilter(event: Event) {
    this.dataSource.data = this.dataCopy;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.data = this.dataService.filterDataResults(this.dataSource.data, filterValue);
  }
}
