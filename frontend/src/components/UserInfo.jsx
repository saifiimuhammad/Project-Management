// import { Popover, Transition } from "@headlessui/react";
// import { Fragment } from "react";
// import { FaUser } from "react-icons/fa";

// const UserInfo = ({ user }) => {
//   if (!user) return null;
//   return (
//     <Popover className="relative">
//       <Popover.Button className="inline-flex items-center focus:outline-none">
//         <FaUser className="w-6 h-6 text-purple-600" />
//       </Popover.Button>
//       <Transition
//         as={Fragment}
//         enter="transition duration-200 ease-out"
//         enterFrom="opacity-0 translate-y-1"
//         enterTo="opacity-100 translate-y-0"
//         leave="transition duration-150 ease-in"
//         leaveFrom="opacity-100 translate-y-0"
//         leaveTo="opacity-0 translate-y-1"
//       >
//         <Popover.Panel className="absolute z-10 mt-2 w-48 p-4 bg-white rounded shadow-lg">
//           <div>
//             <p className="text-sm font-medium text-gray-900">{  user.name || "No Name"}</p>
//             <p className="text-sm text-gray-600">{user.email || "No Email"}</p>
//           </div>
//         </Popover.Panel>
//       </Transition>
//     </Popover>
//   );
// };

// export default UserInfo;








