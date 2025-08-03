"use client";
import React, { useRef, useState } from "react";
import { trpc } from "../../utils/trpc";

const CreateTodo = () => {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const createTodo = trpc.todoRouter.createTodo.useMutation();

  const onClickHandler = () => {
    if (!title.current?.value) {
      setError("please dont leave empty fields");
      return;
    }
    const newTodo = {
      title: title.current?.value,
      description: description.current?.value || "",
      done: done,
    };

    createTodo.mutate(newTodo);
  };

  return (
    <div>
      <input ref={title} placeholder="title" />
      <input ref={description} placeholder="description" />
      <select
        onChange={(e) => setDone(e.target.value === "true")}
        defaultValue="false"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <button onClick={onClickHandler}>Create</button>
      {!createTodo.isPending && !createTodo.isError ? (
        <>{JSON.stringify(createTodo.data)}</>
      ) : (
        <></>
      )}
      {createTodo.isPending ? <>Loading....</> : <></>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default CreateTodo;
