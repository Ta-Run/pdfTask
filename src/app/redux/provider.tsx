"use client"
import { Provider } from "react-redux";
import { createStore } from "redux"; // Import createStore from redux (or use your own store creation logic)

// Example reducer, replace with your own reducer
const rootReducer = (state: any, action: any) => state;

// Create a Redux store
const store = createStore(rootReducer);
//
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
