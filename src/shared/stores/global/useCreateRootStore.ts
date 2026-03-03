import { RootStore } from "./RootStore";
import { isServer } from '../../utils/isServer';

let clientStore: RootStore | undefined;

export const useCreateRootStore = (): RootStore => {
  const initStore = () => new RootStore();

  if (isServer) {
    return initStore();
  }

  clientStore = clientStore ?? initStore();
  return clientStore;
};