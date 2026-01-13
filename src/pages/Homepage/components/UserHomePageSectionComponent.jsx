import { FaPencil } from "react-icons/fa6";
import ThemeSelectorProfile from "../ThemeSelectorProfile";

const UserHomePageSectionComponent = ({ profile }) => {
  return (
    <div className="flex flex-col font-semibold md:grid md:grid-cols-2 w-full min-h-[58vh] bg-skin-fill-1 p-2
     rounded-xl shadow-lg gap-2 text-stylep4 md:text-stylep3 text-skin-color1 px-3 font-Receipt">
      
      <span className="flex flex-col w-full min-h-[20vh] font-semibold">
        <span className="text-stylep1 font-semibold">Profile Details</span>
        <div className="flex flex-col justify-start items-start w-full py-2
          bg-skin-colorContent text-skin-colorContent p-2 rounded-lg h-full shadow-md">
          <span className="text-stylep3">Username: {profile?.username || ""}</span>
          <span>Firstname: {profile?.firstname || ""}</span>
          <span>Lastname: {profile?.lastname || ""}</span>
          <span>Email: {profile?.email || ""}</span>
        </div>
      </span>
      <span className="flex flex-col w-full min-h-[20vh]">
        <span className="text-stylep1 font-semibold">Address Details</span>
        <div className="flex flex-col justify-start items-start w-full py-2 text-stylep3
          bg-skin-colorContent text-skin-colorContent p-2 rounded-lg h-full shadow-sm">
          <span>{profile?.address?.[0]?.street || ""}</span>
          <span>
            {profile?.address?.[0]?.city || ""},{" "}
            {profile?.address?.[0]?.country || ""} -{" "}
            {profile?.address?.[0]?.postalCode || ""}
          </span>
          <span>
            Phone Number: {profile?.address?.[0].phoneNumber}
          </span>
        </div>
      </span>
      <div className="flex flex-row in-center md:col-span-2">
      <button className="text-skin-color1 bg-skin-cart text-stylep4 rounded-full font-display py-2
       flex items-center justify-center px-3 my-2 space-x-2 font-bold w-full sm:w-[160px]"
        onClick={() => console.log("EDIT USER")}
      >
        <FaPencil /><span>EDIT USER</span>
      </button>
      </div>
      <span className="flex flex-col w-full md:col-span-2">
      <span className="text-stylep2 font-semibold">Select Theme</span>
      <div className="flex flex-col justify-start items-start w-full py-2 text-stylep2
          bg-skin-colorContent text-skin-colorContent p-2 rounded-lg min-h-[10vh] shadow-sm">
          <ThemeSelectorProfile />
      </div>
      </span>
    </div>
  );
};

export default UserHomePageSectionComponent;
