import { StorageServices } from "./storage";

export class PromotionServices extends StorageServices {
  constructor() {
    super();
  }

  buildPromotions(promotions) {
    return promotions
      .filter((promotion) => {
        return promotion.promotion && promotion.product && promotion.state;
      })
      .sort((a, b) => a.startDate - b.startDate)
      .map((promotion) => {
        const {
          id: promotionProdId,
          startDate,
          endDate,
          promotion: { id: promotionId, descount, type: promotionType },
          product: {
            id: productId,
            typeProduct: { type },
            price,
          },
        } = promotion;
        return {
          productId,
          promotionProdId,
          promotionId,
          plan: type,
          discount: descount,
          priceDisc: price - (descount * price) / 100,
          startDate,
          endDate,
          dateRange: { startDate, endDate },
          type: promotionType,
        };
      });
  }

  async getPromotions() {
    const filter = {
      include: [
        {
          relation: "promotion",
        },
        {
          relation: "product",
          scope: {
            include: [
              {
                relation: "typeProduct",
                scope: {
                  where: { typeCurrent: "BS" },
                  fields: { id: true, type: true },
                },
              },
            ],
          },
        },
      ],
    };
    try {
      this.setFilterEndpoint(filter);
      return this.buildPromotions(await this.g - etFetchEndpoint("detail-promotions"));
    } catch (e) {
      return [];
    }
  }
}

const Promotion = new PromotionServices();
export default Promotion;
