import { IGroup } from "./Group.interface";

export interface IMember {
  id: number;
  name: string;
  category: IGroup;
}