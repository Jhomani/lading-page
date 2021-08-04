import request, {
  postOptions,
  getOptions,
  postOptionsFormData,
  postOptionsWithSocietyId,
  getOptionsProvideToken,
  postOptionsWithoutToken,
  getOptionsWithoutToken,
  patchOptions,
  deleteOptions,
} from '../request';


export default class MainService {

  public getWithToken(endpoint: string, filter: Object = {}) {
    const options = getOptions();
    const encodeFilter = encodeURI(JSON.stringify(filter));

    let url = `${process.env.BACK_URL}/${endpoint}?filter=${encodeFilter}`;

    return request(url, options);
  }

  public getWithoutToken(endpoint: string, filter: Object = {}) {
    const options = getOptionsWithoutToken();
    const encodeFilter = encodeURI(JSON.stringify(filter));

    let url = `${process.env.BACK_URL}${endpoint}?filter=${encodeFilter}`;

    return request(url, options);
  }

  public postWithToken(endpoint: string, body: Object = {}) {
    const options = postOptions(body);
    let url = `${process.env.BACK_URL}${endpoint}`;

    return request(url, options);
  }

  public updateById(endpoint: string, id: string, body: Object = {}) {
    const options = patchOptions(body);
    let url = `${process.env.BACK_URL}${endpoint}/${id}`;

    return request(url, options);
  }
}