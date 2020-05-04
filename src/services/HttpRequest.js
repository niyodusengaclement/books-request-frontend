import request from './Request';

class HttpRequest {
  static get(url, params = {}, config = {}) {
    return request({
      url,
      method: 'GET',
      params,
      ...config,
    });
  }

  static post(url, data, config = {}) {
    return request({
      url,
      method: 'POST',
      data,
      ...config,
    });
  }

  static patch(url, data, config = {}) {
    return request({
      url,
      method: 'PATCH',
      data,
      ...config,
    });
  }

  static put(url, data, config = {}) {
    return request({
      url,
      method: 'PUT',
      data,
      ...config,
    });
  }

  static delete(url, config = {}) {
    return request({
      url,
      method: 'DELETE',
      ...config,
    });
  }
}

export default HttpRequest;
