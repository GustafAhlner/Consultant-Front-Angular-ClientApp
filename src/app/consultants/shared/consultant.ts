import { Address } from "./address";

export class Consultant {
  /**
   *
   */
  constructor(
    public consultantId = null,
      public nameFirst = '',
      public nameSecond = '',
      public email = '',
      public telephone = '',
      public imageURL = '',
      public birthDate= new Date(1989,5,19),
      public addresses?: Address[]
      ) {}
}
