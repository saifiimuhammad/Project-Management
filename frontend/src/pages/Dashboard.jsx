import React from 'react'
// import clsx from "clsx";
import { useGetDashboardStatsQuery } from '../redux/slices/api/taskApiSlice';
import { useGetDashboardEmployeesQuery } from '../redux/slices/api/userApiSlice';

const Dashboard = () => {
  const {data} = useGetDashboardStatsQuery();
  const totals = data?.tasks;
  const {data: employeeData} = useGetDashboardEmployeesQuery();
  

  const stats = [
    {
      _id: "1",
      label: <span className="text-lg font-semibold">TOTAL PROJECTS</span>,
      total: data?.totalTasks || 0,
    },
    {
      _id: "2",
      label: <span className="text-lg font-semibold">TOTAL EMPLOYEES</span>,
      total: employeeData?.totalEmployees || 0, 
    },
  ];

  const Card = ({ label, count }) => {
    return (
      <div className='w-full h-40 bg-purple-200 p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base font-bold text-purple-700'>{label}</p>
          <span className='text-4xl font-semibold'>{count}</span>
        </div>
      </div>
    )
  }
  return (
    <div classNamee='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        {stats.map(({  label, total }, index) => (
          <Card key={index}  label={label} count={total} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;