import { IGroup } from "@/models/Group.interface";
import {
  HttpClient,
  HttpRequestParamsInterface,
} from "@/models/http-client/index";

export class GroupsServices {
  getGroup() {
    const groupRequest: HttpRequestParamsInterface = {
      url: `http://localhost:3000/groups`,
    };
    return HttpClient.get<IGroup[]>(groupRequest);
  }
  postGroup() {
    const groupRequest: HttpRequestParamsInterface = {
      url: `http://localhost:3000/groups`,
    };
    return HttpClient.post<IGroup[]>(groupRequest);
  }
}
