import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event를 발생시킨 버튼의 name을 읽어오기
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      // oldToDos는 배열
      // 배열의 인덱스를 찾아서 수정하기 위해 toDo의 id가 props에서 온 id와 같은지 비교
      const targetIndex = oldToDos.findIndex((toDO) => toDO.id === id);
      const oldToDo = oldToDos[targetIndex];
      // props로 온 text와 id는 그대로 유지한 채, category만 event로 읽은 name으로 교체
      const newToDo = { text, id, category: name };
      console.log("replace the to do in the index", targetIndex, "with", newToDo);

      return oldToDos;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {/* && 앞의 조건이 true 이면 뒷 부분 실행
      ex) 카테고리가 "TO_DO"가 아니면 To Do 버튼 생성 */}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
