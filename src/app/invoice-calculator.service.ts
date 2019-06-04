import { Injectable } from "@angular/core";
import { VatCategory, VatCategoriesService } from "./vat-categories.service";

export interface InvoiceLine {
  product: string;
  vatCategory: VatCategory;
  priceInclusiveVat: number;
}

export interface InvoiceLineComplete extends InvoiceLine {
  priceExclusiveVat: number;
}

export interface Invoice {
  invoiceLines: InvoiceLineComplete[];
  totalPriceInclusiveVat: number;
  totalPriceExclusiveVat: number;
  totalVat: number;
}

@Injectable({
  providedIn: "root"
})
export class InvoiceCalculatorService {
  constructor(private vatCategoriesService: VatCategoriesService) {}

  public CalculatePriceExclusiveVat(
    priceInclusiveVat: number,
    vatPercentage: number
  ): number {
    // REPLACE the next line with the necessary code

    return (
      -(priceInclusiveVat / (100 + vatPercentage)) * vatPercentage +
      priceInclusiveVat
    );
  }

  public CalculateInvoice(invoiceLines: InvoiceLine[]): Invoice {
    // REPLACE the next line with the necessary code
    let totalPriceExclusiveVat = 0;
    let totalPriceInclusiveVat = 0;
    let totalVat = 0;
    const invLines = invoiceLines.map(
      (line): InvoiceLineComplete => {
        const vat = this.vatCategoriesService.getVat(line.vatCategory);
        totalVat += (line.priceInclusiveVat / (100 + vat)) * 20;
        totalPriceExclusiveVat += (line.priceInclusiveVat / (100 + vat)) * 100;
        totalPriceInclusiveVat += line.priceInclusiveVat;
        return {
          product: line.product,
          vatCategory: line.vatCategory,
          priceExclusiveVat: (line.priceInclusiveVat / (100 + vat)) * 100,
          priceInclusiveVat: line.priceInclusiveVat
        };
      }
    );
    return {
      totalPriceExclusiveVat,
      totalVat,
      totalPriceInclusiveVat,
      invoiceLines: invLines
    };
  }
}
