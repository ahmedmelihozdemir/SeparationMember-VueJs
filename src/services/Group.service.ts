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
  postGroup(data: any) {
    const groupRequest: HttpRequestParamsInterface = {
      url: `http://localhost:3000/groups`,
      payload: data,
    };
    return HttpClient.post<IGroup[]>(groupRequest);
  }
  putGroup(id: number, data: any) {
    const groupRequest: HttpRequestParamsInterface = {
      url: `http://localhost:3000/groups/${id}`,
      payload: data,
    };
    return HttpClient.put<IGroup[]>(groupRequest);
  }
  deleteGroup(id: number) {
    const groupRequest: HttpRequestParamsInterface = {
      url: `http://localhost:3000/groups/${id}`,
    };
    return HttpClient.delete<IGroup[]>(groupRequest);
  }
}
