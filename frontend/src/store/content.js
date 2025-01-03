import { create } from "zustand";

export const useContentStore = create((set) => ({
  //initial state of the store
  //methods to update the state
  contentType: "movie",
  //take the content type and update the state
    setContentType:(type) => set({contentType:type}),
  }));
  