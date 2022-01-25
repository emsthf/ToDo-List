import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

// Recoil에서 데이터를 저장하는 atom
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
