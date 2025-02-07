import { create } from "zustand";
import { loadFromLocalStorage } from "../utils/localStorage";

export const useMarkdownState = create<any>((set) => ({
  content: loadFromLocalStorage("content"),
  changeContent(changedContent: string) {
    set((prev: any) => ({
      ...prev,
      content: changedContent,
    }));
  },
}));
