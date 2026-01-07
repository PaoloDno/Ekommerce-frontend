import { FaPencil } from "react-icons/fa6";
import ThemeSelectorProfile from "../ThemeSelectorProfile";

const UserHomePageSectionComponent = ({ profile }) => {
  return (
    <div className="flex flex-col w-full min-h-[58vh] bg-skin-fill-1 p-2
     rounded-xl shadow-lg gap-2 text-stylep4 text-skin-color1 px-3 font-Receipt">
      <span className="text-stylep2">Profile Details</span>
      <div className="flex flex-col justify-start items-start w-full py-2
        bg-skin-colorContent text-skin-colorContent p-2 rounded-lg min-h-[10vh] shadow-md">
        <span className="text-stylep3">Username: {profile?.username || ""}</span>
        <span>Firstname: {profile?.firstname || ""}</span>
        <span>Lastname: {profile?.lastname || ""}</span>
        <span>Email: {profile?.email || ""}</span>
      </div>
      <span className="text-stylep2">Address Details</span>
      <div className="flex flex-col justify-start items-start w-full py-2
        bg-skin-colorContent text-skin-colorContent p-2 rounded-lg min-h-[10vh] shadow-sm">
        <span>{profile?.address?.[0]?.street || ""}</span>
        <span>
          {profile?.address?.[0]?.city || ""},{" "}
          {profile?.address?.[0]?.country || ""} -{" "}
          {profile?.address?.[0]?.postalCode || ""}
        </span>
      </div>
      <div className="flex flex-row in-center">
      <button className="text-skin-color1 bg-skin-cart text-stylep4 rounded-full font-display
       flex items-center justify-center px-3 py-1 my-2 space-x-2 font-bold w-full sm:w-[160px]"
        onClick={() => console.log("EDIT USER")}
      >
        <FaPencil /><span>EDIT USER</span>
      </button>
      </div>
      <span className="text-stylep2">Select Theme</span>
      <div className="flex flex-col justify-start items-start w-full py-2
          bg-skin-colorContent text-skin-colorContent p-2 rounded-lg min-h-[10vh] shadow-sm">
          <ThemeSelectorProfile />
      </div>
    </div>
  );
};

export default UserHomePageSectionComponent;
