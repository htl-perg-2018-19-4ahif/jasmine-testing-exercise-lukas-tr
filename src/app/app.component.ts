import { Component, OnInit } from "@angular/core";
import {
  InvoiceLine,
  InvoiceCalculatorService,
  Invoice
} from "./invoice-calculator.service";
import { VatCategory } from "./vat-categories.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  invoiceLines: InvoiceLine[] = [];
  invoice: Invoice;

  product = "";
  priceInclusiveVat = 0.0;
  vatCategoryString = "Food";

  vatCategories = VatCategory;

  constructor(private invoiceCalculator: InvoiceCalculatorService) {}

  ngOnInit() {
    this.calculate();
  }

  addInvoice() {
    this.invoiceLines.push({
      priceInclusiveVat: this.priceInclusiveVat,
      product: this.product,
      vatCategory: this.vatCategories[this.vatCategoryString]
    });
    this.calculate();
  }

  get valid() {
    return this.priceInclusiveVat > 0;
  }

  calculate() {
    this.invoice = this.invoiceCalculator.CalculateInvoice(this.invoiceLines);
  }
}
