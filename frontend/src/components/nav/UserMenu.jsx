import React, { useRef } from "react";
import { useAppStore } from "../../../store/appStore";
import { useNavigate } from "react-router-dom";
import useOuterClick from "../../hook/useOuterClick";

const UserMenu = ({ setShowMenu }) => {
  const userRef = useRef(null);
  useOuterClick(userRef, setShowMenu);
  const navigate = useNavigate();
  const { logout, user } = useAppStore();
  return (
    <div
      ref={userRef}
      className="flex absolute top-10 border-[1px] w-fit font-semibold flex-col gap-2 bg-white p-4 shadow-md rounded-md"
    >
      <h2 className="text-gray-500 shrink-0">{user?.name}</h2>
      <h2
        className="cursor-pointer"
        onClick={() => logout(navigate, setShowMenu)}
      >
        Logout
      </h2>
    </div>
  );
};

export default UserMenu;
