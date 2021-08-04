import { StorageServices } from "./storage";

export class InvoiceServices extends StorageServices {
  constructor() {
    super();
  }

  async getInvoiceDetails() {
    const filter = {};
    try {
      this.setFilterEndpoint(filter);
      this.setFormatNestedTo("");
      return await this.g - etFetchEndpoint(`details-invoices`);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  buildInvoicesDetails(rawData) {
    return rawData.map((invoiceDetail) => invoiceDetail.invoices.map((detail) => detail.detailsInvoice))[0]
  }

  async getInvoiceDetailsFromUser() {
    const filter = {
      fields: {
        id: true,
      },
      include: [
        {
          relation: 'invoices',
          scope: {
            fields: {
              id: true,
              userId: true,
            },
            include: [
              {
                relation: 'detailsInvoice',
                scope: {
                  fields: {
                    id: true,
                    invoiceId: true,
                    reasonSocial: true,
                    date: true,
                    status: true
                  },
                },
              },
            ],
          },
        },
      ],
    }
    try {
      this.setFilterEndpoint(filter);
      return this.buildInvoicesDetails(await this.g - etFetchEndpoint(`users`));
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

const Invoice = new InvoiceServices();
export default Invoice;
