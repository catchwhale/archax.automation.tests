/**
 * @file this is version 1.0 of the api for standardization
 * @since 1.0.0
 */

let logging = false;
class request {
  /**
   * @constructor when making a request
   * @param  {string} url url of the api
   * @param  {json} obj json data
   * @param  {json} req contains the parameters needed
   */
  constructor(url, obj, req) {
    this.url = url;
    this.obj = obj;
    this.req = req;
  }

  init() {
    return {
      method: this.method(this.obj, this.req.main, this.req.ext), // method
      url: `${this.url}${this.extension(
        this.obj,
        this.req.main,
        this.req.ext,
        this.req.params
      )}`, //url
      headers: this.req.headers, //headers
      body: this.checker(this.req.body, null), //body
    };
  }

  /**
   * @description triggers the api request and wrap response as api.response
   */
  triggered() {
    let obj = this.init();
    return cy.request(
      this.structure(obj.method, obj.url, obj.headers, obj.body),
      { timeout: 60000, log: true }
    );
  }

  /**
   * @description Construct the request for get
   * @param  {string} method method type
   * @param  {string} url url of the api
   * @param  {json} headers headers to send
   * @param  {json} body body of the request
   * @return request structure
   */
  structure(method, url, headers, body) {
    if (["POST", "PUT", "PATCH"].includes(method)) {
      return {
        method,
        url,
        body,
        headers,
        failOnStatusCode: false,
        log: logging,
      };
    } else if (["GET", "DELETE"].includes(method)) {
      return {
        method,
        url,
        headers,
        failOnStatusCode: false,
        log: logging,
      };
    }
  }

  /**
   * Get the method from api.json
   * @param  {string} obj json objects
   * @param  {string} main main api name
   * @param  {string} ext child api name
   * @return metho to use for request
   */
  method(obj, main, ext) {
    return obj[main][ext].method;
  }

  /**
   * @descript Get the api link
   * @param  {string} obj json objects
   * @param  {string} main main api name
   * @param  {string} ext child api name
   * @param  {string} params optional when the url needs parameters
   * @return extended url with data
   */
  extension(obj, main, ext, params) {
    let url = obj[main][ext].api,
      regs = url.match(/({)\w+(})/g);

    if (regs !== null) {
      regs.forEach((items) => {
        url = url.replace(items, params[items.match(/\{([^)]+)\}/)[1]]);
      });
    }
    return url;
  }

  /**
   * @description Checks if value arg0 exists. Uses arg0 if exists
   * @param  {string} arg0 variable to check
   * @param  {string} arg1 value to set if arg0 is undefined, null and empty
   * @return final data
   */
  checker(arg0, arg1) {
    return arg0 === undefined || arg0 === null || arg0 === "" ? arg1 : arg0;
  }
}
export default request;
