import React from "react";
import { useParams } from "react-router-dom";
import { useGetTaskQuery } from "../redux/slices/api/taskApiSlice";
import { useGetAllUsersQuery } from "../redux/slices/api/userApiSlice";
import Spinner from "../components/Spinner";

const TaskDetails = () => {
  const { id } = useParams();

  // Fetch the task details.
  const { data, isLoading } = useGetTaskQuery(id);
  const task = data?.task;

  // Fetch all users.
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();

  if (isLoading || usersLoading) {
    return <Spinner />;
  }

  // Map team IDs (from task.team) to full user objects from usersData.
  const teamDetails =
    task?.team?.map((teamId) => {
      // Make sure to convert ObjectIds (if needed) to string for proper comparison.
      return usersData?.find(
        (user) => user._id.toString() === teamId.toString()
      );
    }).filter(Boolean) || [];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{task?.title}</h1>
        <p className="text-gray-500">
          Created on: {new Date(task?.date).toLocaleDateString()}
        </p>
      </div>

      {/* Description & Budget Section */}
      <div className="mb-8">
        <p className="text-gray-700 text-lg">{task?.description}</p>
        {task?.budget && (
          <p className="mt-2 text-gray-600 font-medium">
            Budget: ${task?.budget}
          </p>
        )}
      </div>

      {/* Team Members Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Assigned Team Members
        </h2>
        {teamDetails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teamDetails.map((member) => (
              <div
                key={member._id}
                className="p-4 bg-gray-50 rounded shadow hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-medium text-gray-700">
                  {member.name}
                </h3>
                {member.email && (
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Email:</span> {member.email}
                  </p>
                )}
                {member.role && (
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Role:</span> {member.role}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No team members assigned.</p>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;













