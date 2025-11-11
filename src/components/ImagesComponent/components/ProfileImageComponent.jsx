import profileImage1 from "../images/profiles/A1.jpg";
import profileImage2 from "../images/profiles/A2.jpg";
import profileImage3 from "../images/profiles/A3.jpg";

const ProfileImage = ({profileImage}) => {

  let profileSrc = "";

  switch (profileImage) {
    case "A1":
      profileSrc = profileImage1;
      break;
    case "A2":
      profileSrc = profileImage2;
      break;
    case "A3":
      profileSrc = profileImage3;
      break;
    default:
      profileSrc = profileImage1;
  }

  return(
    <div className="w-full h-full flex justify-center items-center">
      <img src={profileSrc} alt="profile-avatar" className="w-full h-full object-cover" />
    </div>
  );
};

export default ProfileImage;