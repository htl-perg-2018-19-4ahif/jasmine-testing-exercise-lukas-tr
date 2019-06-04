import { Injectable } from "@angular/core";

export enum VatCategory {
  Food,
  Drinks
}

@Injectable({
  providedIn: "root"
})
export class VatCategoriesService {
  constructor() {}

  public getVat(category: VatCategory): number {
    // REPLACE the next line with the necessary code
    return (category === 0 && 20) || (category === 1 && 10) || NaN;
  }
}
