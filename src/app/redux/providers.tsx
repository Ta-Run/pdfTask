"use client"
import { Provider } from "react-redux";
import { store } from "./store";
// const rootReducer = (state: any, action: any) => state;

// const store = createStore(rootReducer);
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
