import MainService from './Service';
import { Filter } from './filter/index';

export interface InPayment {
  id: string,
  title: string,
  type: string,
  points: number,
  details: string[],
  price: number
}

export interface InPayInfo {
  link: string;
  paymentId: string;
  discount: number
}

interface InPaymentModel extends InPayment {
  es_title?: string,
  description?: string,
  es_description?: string,
  historyDetail?: string,
  es_historyDetail?: string,
  es_details: string[],
}

class PaymentService extends MainService {
  constructor() {
    super();
  }

  async getPlans(sufix = '') {
    const filter: Filter<InPaymentModel> = {
      order: ['points ASC'],
      fields: {
        id: true,
        [`${sufix}title`]: true,
        points: true,
        [`${sufix}details`]: true,
        type: true,
      },
      where: {
        type: 'plan'
      },
    };

    try {
      let products = await this.getWithToken(
        '/products/with-promotion', filter
      );

      console.log(products)
      return products;
    } catch (err) {
      throw new Error(err);
    }
  }

  async claimLink(variable: object) {
    const body = {
      firstName: "",
      lastName: "",
      ...variable,
    }

    try {
      let paymentInfo = await this.postWithToken('/payments/purchase', body);

      return paymentInfo;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updatePayment(chunks: object, id: string) {
    try {
      let paymentInfo = await this.updateById('/payments', id, chunks);

      return paymentInfo;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const payments = new PaymentService();

export default payments;