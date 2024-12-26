import SideBar from "@/components/Dashboard/sideBar";
import { Button } from "@/components/ui/button";
import { fetchAllEmp } from "@/services/authservice";
import React from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";

function AllEmployee() {
  const navigate = useNavigate();
  const {
    data: empData,
    isLoading,
    isError,
    error,
  } = useQuery("allEmployee", fetchAllEmp, {
    refetchOnMount: true,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="w-3/4 flex h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center mb-6">Employee List</h1>
          <div className="flex justify-end">
            <Link to="/addemployee">
              <Button className="mb-3">Create New Employee</Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left text-slate-800 px-6 py-4 border-b border-gray-300">
                    Employee ID
                  </th>
                  <th className="text-left  text-slate-800 px-6 py-4 border-b border-gray-300">
                    Employee Image
                  </th>
                  <th className="text-left  text-slate-800 px-6 py-4 border-b border-gray-300">
                    Employee Name
                  </th>
                  <th className="text-left px-6  text-slate-800 py-4 border-b border-gray-300">
                    Employee Email
                  </th>
                  <th className="text-left  text-slate-800 px-6 py-4 border-b border-gray-300">
                    Employee Phone
                  </th>
                  <th className="text-left  text-slate-800 px-6 py-4 border-b border-gray-300">
                    job title
                  </th>
                  <th className="text-left  text-slate-800 px-6 py-4 border-b border-gray-300">
                    Salary
                  </th>
                </tr>
              </thead>
              <tbody>
                {empData.data && empData.data.length > 0 ? (
                  empData.data.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate(`/viewemplyoee/${item._id}`)}
                    >
                      <td className="px-6 text-slate-600 py-4 border-b border-gray-300">
                        {item._id}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        <img
                          src={item.profileImg}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4 text-slate-600 border-b border-gray-300">
                        {item.username}
                      </td>
                      <td className="px-6 py-4 text-slate-600 border-b border-gray-300">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 text-slate-600 border-b border-gray-300">
                        {item.phone}
                      </td>
                      <td className="px-6 py-4 text-slate-600 border-b border-gray-300">
                        {item.jobtitle}
                      </td>
                      <td className="px-6 py-4 text-slate-600 border-b border-gray-300">
                        {item.salary}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center px-6 py-4 border-b border-gray-300 text-gray-500"
                    >
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllEmployee;
