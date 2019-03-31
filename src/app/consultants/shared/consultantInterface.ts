import { Address } from "./address";

export interface Consultant {
    consultantId: number;
   nameFirst: string;
   nameSecond: string;
   email: string;
   telephone: string;
   imageURL: string;
    birthDate: Date;
  addresses?: Address[];
}
