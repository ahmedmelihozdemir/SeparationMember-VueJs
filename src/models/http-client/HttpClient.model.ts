import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpRequestParamsInterface } from "./HttpRequestParams.interface";
import { HttpClientInterface } from "./HttpClient.interface";
import { IMember } from "@/models/Member.interface";

/**
 * @name HttpClientModel
 * @description
 * Wraps http client functionality to avoid directly using a third party npm
package like axios
  * and simplify replacement in the future if such npm package would stop being
developed or other reasons
 */
export class HttpClientModel implements HttpClientInterface {
  private getToken(): string {
    const TOKEN_KEY =
      process.env && process.env.VUE_APP_TOKEN_KEY
        ? process.env.VUE_APP_TOKEN_KEY
        : "myapp-token";
    const token = localStorage.getItem(TOKEN_KEY) || "";
    return token;
  }
  get<T>(parameters: HttpRequestParamsInterface): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url /* requiresToken */ } = parameters;
      const options: AxiosRequestConfig = {
        headers: {},
      };
      axios
        .get(url, options)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((response: AxiosResponse) => {
          console.info("------ rejecting ----");
          reject(response);
        });
    });
  }
  post<T>(parameters: HttpRequestParamsInterface): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, payload /* requiresToken, payload */ } = parameters;
      // axios options
      const options: AxiosRequestConfig = {
        headers: {},
      };
      axios
        .post(url, payload, options)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((response: AxiosResponse) => {
          console.log("------ rejecting ----");
          reject(response);
        });
    });
  }
  /* put<T>(parameters: HttpRequestParamsInterface): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url } = parameters;
      const options: AxiosRequestConfig = {
        headers: {},
      };
      const payload = {};
      axios
        .put(url, payload, options)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((response: AxiosResponse) => {
          console.log("------ rejecting ----");
          reject(response);
        });
    });
  } */
  put<T>(parameters: HttpRequestParamsInterface): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, payload } = parameters;
      const options: AxiosRequestConfig = {
        headers: {},
      };
      axios
        .post(url, payload, options)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((response: AxiosResponse) => {
          console.log("------ rejecting ----");
          reject(response);
        });
    });
  }
  delete<T>(parameters: HttpRequestParamsInterface): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, id } = parameters;
      const options: AxiosRequestConfig = {
        headers: {},
      };
      axios
        .delete(url, options)
        .then((response: AxiosResponse) => {
          resolve(response.data as T);
        })
        .catch((response: AxiosResponse) => {
          console.log("------ rejecting ----");
          reject(response);
        });
    });
  }
}
