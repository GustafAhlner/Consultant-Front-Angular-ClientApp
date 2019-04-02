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
  public consultantsFiltered: Consultant[];
  public consultantsNotFound: boolean = true;
  pageTitle: string = 'Consultant Index';
  errorMessage = '';

  _filterString = '';
  get filterString(): string {
    return this._filterString;
  }
  set filterString(inputString: string) {
    this._filterString = inputString;
    this.consultantsFiltered = this.filterConsultants(this.filterString);
  }

  

  constructor(private data: DataService, private router: Router) { }

  filterConsultants(filterString: string): Consultant[] {
    if (filterString == '') { return this.consultants }
    filterString = filterString.toLocaleLowerCase();
    return this.consultants.filter((consultant: Consultant) => 
      (this.getConsultantFullName(consultant).toLocaleLowerCase().indexOf(filterString) !== -1 
      ));
  }
  getConsultantFullName(consultant: Consultant): string {
    return consultant.nameFirst + ' ' + consultant.nameSecond;
  }

  ngOnInit() {
    this.data.getAllConsultants()
      .subscribe(
        consultants => {
          this.consultants = consultants;
          this.consultantsFiltered = this.consultants;
        },
        error => {
        this.errorMessage = <any>error;
        }
      );
  }

  onDetailsClicked(consultantId: string): void {
    this.router.navigate(['consultants/details'], { queryParams: { id: consultantId } });
  }
  onEditClicked(consultantId: string): void {
    this.router.navigate(['consultants/edit'], { queryParams: { id: consultantId } });
  }
}
