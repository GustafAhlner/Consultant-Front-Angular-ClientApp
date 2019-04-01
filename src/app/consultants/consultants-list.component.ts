import { Component, OnInit } from '@angular/core'
import { ConsultantCardComponent } from './consultant-card.component'
import { HttpClientModule } from "@angular/common/http";
import { Consultant } from "./shared/consultant";
import { DataService } from "./shared/dataService";

import { Router } from '@angular/router';

@Component({
  selector: 'consultants-list',
  templateUrl: './consultants-list.component.html',
  styleUrls: ['./consultants-list.component.css'],
  providers: [DataService]
})
export class ConsultantsListComponent implements OnInit {
  public consultants: Consultant[];
  public consultantsNotFound: boolean = true;
  pageTitle: string = 'Consultant Index';
  errorMessage = '';

  constructor(private data: DataService, private router: Router) {}

  ngOnInit() {
    this.data.getAllConsultants()
      .subscribe(
      consultants => {
        this.consultants = consultants;
        },
        error => {this.errorMessage = <any>error;
        console.log(this.errorMessage);
      }
      );
  }

  onDetailsClicked(consultantId: string): void {
    this.router.navigate(['consultants/details'], { queryParams: { id: consultantId }});
  }
onEditClicked(consultantId: string): void {
  this.router.navigate(['consultants/edit'], { queryParams: { id: consultantId }});
  }
}
