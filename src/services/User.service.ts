import { IMember } from "@/models/Member.interface";
import {
  HttpClient,
  HttpRequestParamsInterface,
} from "@/models/http-client/index";

export class UsersService {
  getUser() {
    const memberRequest: HttpRequestParamsInterface = {
      url: `http://localhost:3000/members`,
    };
    return HttpClient.get<IMember[]>(memberRequest);
  }
  postUser(data: any) {
    const memberRequest: HttpRequestParamsInterface = {
      url: `http://localhost:3000/members`,
      payload: data,
    };
    return HttpClient.post<IMember[]>(memberRequest);
  }
  putUser() {
    const memberRequest: HttpRequestParamsInterface = {
      url: `http://localhost:3000/members`,
    };
    return HttpClient.put<IMember[]>(memberRequest);
  }
  deleteUser() {
    const memberRequest: HttpRequestParamsInterface = {
      url: `http://localhost:3000/members`,
    };
    return HttpClient.delete<IMember[]>(memberRequest);
  }
}
