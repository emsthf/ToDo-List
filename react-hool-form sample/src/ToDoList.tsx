import React, { useState } from "react";
import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

interface IForm {
  email: string;
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    // 서버 오류나 그외 폼 외적인 오류를 처리하고 싶을 때에는 인터페이스에 옵셔널로 새 오류 변수를 만들어주면 된다
    // setError("extraError", { message: "Server offline" });
  };
  console.log(errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              // 정규표현식
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "오직 @naver.com 이메일만 가능합니다",
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <input
          // 한 input 창에 여러 검증 조건이 붙을 수 있다
          {...register("firstName", {
            // register 검증 옵션에서 "문자열"은 모두 오류 메시지
            required: "write here",
            validate: {
              noNico: (value) => (value.includes("nino") ? "nico를 입력하면 안됨" : true),
              noNick: (value) => (value.includes("nick") ? "nick을 입력하면 안됨" : true),
            },
          })}
          placeholder="first name"
        />
        {/* 오류가 안생겨서 errors를 받지 못할 수고 있으니 errors에 '?'를 꼭 붙여줘야 한다 */}
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "write here" })}
          placeholder="last name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          // 최소 입력 길이 제한
          {...register("username", { required: "write here", minLength: 10 })}
          placeholder="username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", { required: "write here", minLength: 5 })}
          placeholder="pw"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password is required!!",
            // 최소 길이인 5 미민일 때 리턴 받을 메시지
            minLength: { value: 5, message: "Your password is too short." },
          })}
          placeholder="pw repeat"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
