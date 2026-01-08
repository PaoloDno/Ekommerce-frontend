import { FaLock, FaStore } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const StoreHomepageSectionComponent = ({ profile, storeNotif }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-full min-h-[58vh] bg-skin-fill-1 p-2
     rounded-xl shadow-lg gap-2 text-stylep3 text-skin-color1 
     px-3 font-Receipt"
    >
      {!profile?.storeName ? (
        // USER HAS NO STORE
        <div className="flex flex-col items-center w-full h-full space-y-2 lg:space-y-3">
          <span className="text-stylep3">You don’t own a store yet.</span>

          <button
            className="flex w-[170px] bg-skin-green py-1 px-3 items-center gap-2"
            onClick={() => navigate("/create-store")}
          >
            <FaCirclePlus />
            <span>Create Store</span>
          </button>

          <div className="flex flex-row md:flex-col lg:w-1/2 w-full gap-2 opacity-75">
            <div className="flex flex-col items-center gap-3 bg-skin-colorContent bg-opacity-15 rounded-md p-3">
              <FaStore className="size-8 text-skin-color2" />
              <span className="text-stylep4 text-center leading-tight">
                “Turn creativity into commerce — your store, your story.”
              </span>
            </div>

            <div className="flex flex-col items-center gap-3 bg-skin-colorContent bg-opacity-15 rounded-md p-3">
              <FaLock className="size-8 text-skin-color2" />
              <span className="text-stylep4 text-center leading-tight">
                Keep your store secure. We value a safe community.
              </span>
            </div>
          </div>
        </div>
      ) : (
        // USER HAS A STORE
        <div className="flex flex-col w-full h-full gap-2">
          <div className="bg-skin-colorContent text-skin-colorContent rounded-md w-full p-3">
            <p className="mb-1">Manage your business easily.</p>
            <h2 className="font-semibold mb-2">Your Store is Live!</h2>

            <button
              className="w-[160px] bg-skin-cart py-1 px-2 rounded-lg"
              onClick={() => navigate(`/store/${profile.storeName}`)}
            >
              Visit Store
            </button>
          </div>

          <h2 className="text-stylep2 font-bold">Store Notifications</h2>

          <div className="flex flex-col px-2 py-1 space-y-2 rounded-lg text-skin-colorContent bg-skin-colorContent h-[35vh] overflow-y-auto">
            {storeNotif.length === 0 ? (
              <span className="text-stylep4 opacity-60">
                No notifications yet.
              </span>
            ) : (
              storeNotif.map((notif, i) => (
                <div
                  key={notif._id}
                  className={`
                    group flex flex-col gap-1 rounded-lg border group
                    px-3 py-2 text-stylep4 cursor-pointer transition-all
                    ${
                      notif.read
                        ? "bg-skin-fill-1 border-skin-border opacity-70"
                        : "bg-skin-fill-2 border-skin-accent shadow-sm"
                    }
                    hover:bg-skin-fill-4 hover:opacity-100 hover:text-skin-colorHigh
                  `}
                >
                  {/* Subject */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm ${
                        notif.read
                          ? "text-skin-color2"
                          : "text-skin-colorHigh font-semibold"
                      }`}
                    >
                      {notif.subject}
                    </span>

                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-skin-accent" />
                    )}
                  </div>

                  {/* Message */}
                  <p className="text-skin-color1 text-xs leading-snug">
                    {notif.message}
                  </p>

                  {/* Timestamp */}
                  <span className="text-[12px] text-skin-color2 self-end">
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreHomepageSectionComponent;
