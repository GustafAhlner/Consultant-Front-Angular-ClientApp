import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
}

)
export class ImageService {
    returnConsultantImageUrl(imageName: string): string {
        if (imageName=="") {
            imageName="consultant-noImage.jpg"
        } 
        return "../../assets/images/" + imageName;
    }
}