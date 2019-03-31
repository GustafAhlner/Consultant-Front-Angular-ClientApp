import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { Consultant } from './shared/consultant';
import { ImageService } from './shared/imageHandler';

@Component({
    selector: 'consultant-card',
    templateUrl: './consultant-card.component.html',
    styleUrls: ['./consultant-card.component.css']
})
export class ConsultantCardComponent implements OnInit {
    @Input() consultant: Consultant;
    @Output() detailsClicked: EventEmitter<string> =
        new EventEmitter<string>();
    @Output() editClicked: EventEmitter<string> =
        new EventEmitter<string>();

    constructor(private imageHandler: ImageService) {
    }

    ngOnInit(): void {
        this.consultant.imageURL =
            this.imageHandler.returnConsultantImageUrl(this.consultant.imageURL);
    }

    onClickEdit(): void {
        this.editClicked.emit(`${this.consultant.consultantId}`);
    }
    onClickDetails(): void {
        this.detailsClicked.emit(`${this.consultant.consultantId}`);
    }
}
