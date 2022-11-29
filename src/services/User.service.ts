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
  postUser() {
    const memberRequest: HttpRequestParamsInterface = {
      url: `http://localhost:3000/members`,
    };
    return HttpClient.post<IMember[]>(memberRequest);
  }
}
