import { StorageServices } from './storage'

export class PlanListServices extends StorageServices {
  constructor() {
    super()
  }

  buildPlans(rawData) {
    return rawData
      .filter((plan) => {
        return plan.products
      })
      .map((plan, index) => {
        const {
          id,
          typeProductId,
          price,
          amountPoints,
          description,
        } = plan.products[0]
        return {
          id,
          typeProductId,
          number: index + 1,
          plan: plan.type,
          points: `${amountPoints} pts`,
          description: description,
          charge: `${price} ${plan.typeCurrent}`.toLowerCase(),
          typeCurrent: plan.typeCurrent,
        }
      })
  }

  async getPlanList() {
    const filter = {
      fields: {
        id: true,
        typeCurrent: true,
        type: true,
      },
      where: {
        typeCurrent: 'BS',
      },
      include: [
        {
          relation: 'products',
          scope: {
            fields: {
              id: true,
              typeProductId: true,
              title: true,
              description: true,
              amountPoints: true,
              price: true,
            },
          },
        },
      ],
    }
    try {
      this.setFilterEndpoint(filter)
      return this.buildPlans(await this.g - etFetchEndpoint('type-products'))
    } catch (e) {
      console.log(e)
      return []
    }
  }
}

const PlanList = new PlanListServices()
export default PlanList
