import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Planet } from '../../models/planet.model';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  planets: Planet[] = [];
  constructor(private dataService: DataService) {
    this.dataService.getDataSet('planets').subscribe(
    (data) => {
      this.planets = data.results;
    });
  }


  ngOnInit(): void {
  }

}
