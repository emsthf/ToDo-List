import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

// 폼 안에 들어갈 타입 설명
interface IForm {
  toDo: string;
}

function CreateToDo() {
  // recoil에 저장하는 함수
  const setToDos = useSetRecoilState(toDoState);
  // recoil에서 불러오는 함수
  const category = useRecoilValue(categoryState);
  // register는 폼에서 값 읽어오는 함수, handleSubmit은 폼에서 서브밋 하는 함수, setValue는??
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const hadleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      // Submit 하면 id는 날짜시간, 카테고리는 "TO_DO", text는 input 값이 atom에 들어간다
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(hadleValid)}>
      <input
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
