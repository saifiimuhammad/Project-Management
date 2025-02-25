import React, { useState } from "react";
import Title from "../components/Title";
// import Button from "../components/Button";
// import { IoMdAdd } from "react-icons/io";
import Table from "../components/task/Table";
// import AddTask from "../components/task/AddTask";
import Spinner from "../components/Spinner";
import { useGetTasksQuery } from "../redux/slices/api/taskApiSlice";
// import UpdateTask from "../components/task/UpdateTask";

const Tasks = () => {
  const { data, isLoading } = useGetTasksQuery({
    strQuery: "",
    search: "",
  });
  console.log(data);

  return isLoading ? (
    <div className="py-10">
      <Spinner />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title="All Projects" />
      </div>

      <div className="w-full">
        <Table tasks={data?.tasks} />
      </div>

      {/* <UpdateTask open={open} setOpen={setOpen} /> */}
    </div>
  );
};

export default Tasks;
