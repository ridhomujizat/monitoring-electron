import { NavLink, Outlet } from "react-router-dom";
import { menu } from "./menu";
import clsx from "clsx";

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex w-full">
        {menu.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              clsx(
                "flex-1 p-2 flex flex-col justify-center items-center border border-gray-300 transition-colors duration-300 ease-in-out",
                {
                  "bg-slate-400 text-white": isActive,
                  "bg-gray-200 hover:bg-slate-400 cursor-pointer hover:text-white":
                    !isActive,
                }
              )
            }
          >
            {item.icon}
            <p>{item.label}</p>
          </NavLink>
        ))}
      </div>
      <div className="w-full h-full flex-1">
        <Outlet />
      </div>
    </div>
  );
}
