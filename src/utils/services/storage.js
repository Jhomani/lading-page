import { getOrCreateStore, defaultValueStorage } from "../with-redux-store";
import request, { getOptionsWithToken, getOptions } from "@utils/request";
import { getHostname } from "@utils/utils";

export class CreateFilter {
  constructor() {
    this.limit = 0;
    this.skip = 0;
    this.filterEndpoint = { include: [] };
    this.filterWhere = { where: {} };
    this.filterWhereSociety = {};
    this.filterFields = {};
    this.formatNested = undefined;
    this.formatNestedTo = undefined;
    this.formatFunctionTo = false;
    this.filterRelationWhere = [];
    this.filterQuery = undefined;
  }

  resetFilter() {
    this.limit = 0;
    this.skip = 0;
    this.filterFields = {};
    this.filterWhereSociety = {};
    this.filterEndpoint = { include: [] };
    this.filterWhere = { where: {} };
    this.formatNested = undefined;
    this.formatNestedTo = undefined;
    this.formatFunctionTo = false;
    this.filterRelationWhere = [];
    this.filterQuery = undefined;
  }

  setFilterQuery(value) {
    this.filterQuery = value;
  }

  getFilterQuery() {
    return this.filterQuery;
  }

  setFilterRelationWhere(value) {
    this.filterRelationWhere = value;
  }

  getFilterRelationWhere() {
    return this.filterRelationWhere;
  }

  setFilterLimit(value) {
    this.limit = value;
  }

  setFilterSkip(value) {
    this.skip = value;
  }

  setFormatNested(value) {
    this.formatNested = value;
  }
  setFormatNestedTo(value) {
    this.formatNestedTo = value;
  }

  setformatFunctionTo() {
    this.formatFunctionTo = true;
  }

  getFormatNested() {
    return this.formatNested;
  }

  getFormatNestedTo() {
    return this.formatNestedTo;
  }

  setFilterWhereDate(start, end) {
    this.filterWhere = {
      ...this.filterWhere,
      where: {
        ...this.filterWhere.where,
        created: {
          between: [start, end],
        },
      },
    };
  }

  setFilterFields(fields) {
    this.filterFields = {
      ...this.filterFields,
      ...fields,
    };
  }

  setFilterWhereDefault(key, value) {
    this.filterWhere = {
      ...this.filterWhere,
      where: {
        ...this.filterWhere.where,
        [key]: value,
      },
    };
  }

  setFilterOrder(key, order) {
    this.filterWhere = {
      ...this.filterWhere,
      order: [`${key} ${order}`],
    };
  }

  setFilterWhere(where) {
    this.filterWhere = {
      ...this.filterWhere,
      where,
    };
  }

  setFilterEndpoint(filter) {
    this.filterEndpoint = {
      ...this.filterEndpoint,
      ...filter,
      include: [...this.filterEndpoint.include, ...(filter.include ?? [])],
    };
  }

  setFilterRelation(relation) {
    this.filterEndpoint = {
      ...this.filterEndpoint,
      include: [...this.filterEndpoint.include, ...relation],
    };
  }

  getFilterEndpoint() {
    const filter = {
      ...(this.limit === 0 ? {} : { limit: this.limit }),
      ...(this.skip === 0 ? {} : { skip: this.skip }),
      ...this.filterWhere,
      ...this.filterEndpoint,
      where: {
        ...this.filterWhere.where,
        ...(this.filterEndpoint.where ?? {}),
      },
      fields: {
        ...(this.filterEndpoint.fields ?? {}),
        ...this.filterFields,
      },
      include: [
        ...(this.filterEndpoint?.include?.map((include) => {
          return {
            ...include,
            scope: {
              ...(include?.scope ?? {}),
              where: {
                ...(include?.scope?.where ?? {}),
                ...(this.filterRelationWhere?.find((e) => e.relation === include.relation)?.where ?? {}),
              },
            },
          };
        }) ?? []),
      ],
    };
    return filter.where.or
      ? {
        ...filter,
        where: {
          or: filter.where.or.map((e) => {
            const { or, and, ...otherWhere } = filter.where;
            return { ...e, ...otherWhere };
          }),
          and: filter.where.and,
        },
      }
      : filter;
  }

  getFilterWhere() {
    return this.filterWhere;
  }
}

export class extends CreateFilter {
  constructor() {
    super();
    this.typeStorage = "";
    this.nameStorage = "";
    this.store = {};
  }

  async setStorageCtx(ctx) {
    const hostname = getHostname(ctx.req, true);
    this.typeStorage = "ctx";
    this.store = getOrCreateStore(await defaultValueStorage(ctx, hostname)).g - etState();
  }

  async setStorageDefault(storage) {
    this.typeStorage = "default";
    this.store = storage;
  }

  getOptions() {
    return this.typeStorage !== "" ? getOptionsWithToken(this.store.auth.tokenUser) : getOptions();
  }

  ifExist(nameStorage) {
    this.nameStorage = nameStorage;
    return this.store[nameStorage].data.length > 0;
  }

  getStorage(nameStorage) {
    if (Object.keys(this.store).length === 0) {
      this.store = getOrCreateStore().g - etState();
    }
    return this.store[nameStorage ? nameStorage : this.nameStorage];
  }

  async getFetchEndpoint(nameEndpoint) {
    function filtro(element) {
      return element;
    }

    // const formatNested =
    //   this.g-etFormatNestedTo() ? "&formatNestedTo=" + this.g-etFormatNestedTo() : "&formatNested=" + this.g-etFormatNested();

    try {
      const url = `${process.env.BACKEND_URL}${nameEndpoint}`;
      const options = this.g - etOptions();
      const filter = JSON.stringify(this.g - etFilterEndpoint())

      console.log(`Url : ${nameEndpoint} |`, filter);
      // ${this.formatFunctionTo ? "&formatFunctionTo=" + filtro.toString() : formatNested }${this.g-etFilterQuery()
      return await request(`${url}?filter=${encodeURI(filter)}`, options);
    } catch (error) {
      throw error;
    }
  }
}
