"use client";

import { trpc } from "../../utils/trpc";
import { Todo } from "@repo/trpc-config/types";

const AllTodos = () => {
  const todos = trpc.todoRouter.getAllTodo.useQuery();
  console.log(todos);
  return (
    <div>
      {todos?.data?.map((todo: Todo) => (
        <div key={todo._id}>
          <p>Title:{todo.title}</p>
          <p>Description:{todo.description}</p>
          <button>Edit</button>
          <button>Update</button>
          <br />
        </div>
      ))}
    </div>
  );
};
export default AllTodos;
