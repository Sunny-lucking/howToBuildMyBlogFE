
import { CategoryStore } from "./category"
import {UserStore} from "./user"
export * from "./user"
export * from "./category"
export default interface StateStore {
  userStore: UserStore,
  categoryStore: CategoryStore,
}

export interface Action<T = any> {
  type: string;
  payload: T;
}
