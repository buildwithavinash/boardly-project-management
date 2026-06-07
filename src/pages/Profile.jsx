import { useState } from "react";
import Container from "../components/Container";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";
import { capitalize } from "../utils/formatters";

const Profile = () => {
  const { user, userInfo, role, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const displayName = userInfo?.name || "User";
  const initial = displayName.charAt(0).toUpperCase();
  const email = user?.email || "No email available";
  const joinedDate = userInfo?.created_at
    ? new Date(userInfo.created_at).toLocaleDateString()
    : "N/A";

  return (
    <Container>
      {showLogoutModal && (
        <ConfirmModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={logout}
          message="Sure want to logout?"
          confirmText="Logout"
        />
      )}
      <div>
        <h3 className="text-center text-2xl font-medium text-primary">
          My Profile
        </h3>
      </div>
      <div className="mt-4">
        <div className="flex justify-center items-center flex-col gap-2">
          <div className="h-18 w-18 bg-slate-100 border border-primary/50 rounded-full flex justify-center items-center overflow-hidden">
            <div className="h-full w-full flex justify-center items-center">
              {initial}
            </div>
          </div>
        </div>

        <div className="mt-4">
          {/* <h3 className="font-semibold text-slate-800">Account</h3> */}
          <div className="flex flex-col bg-card border border-border/20 p-2 rounded-lg">
            <div className="flex justify-between">
              <p>Name</p>
              <p className="text-slate-700">{capitalize(displayName)}</p>
            </div>

            <div className="flex justify-between">
              <p>Email</p>
              <p className="text-slate-700">{email}</p>
            </div>

            <div className="flex justify-between">
              <p>Role</p>
              <p
                className={`${role === "admin" ? " text-blue-500 " : " text-yellow-500"}`}
              >
                {capitalize(role || "Member")}
              </p>
            </div>

            <div className="flex justify-between">
              <p>Member since</p>
              <p className="text-slate-700">{joinedDate}</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm mb-2 text-slate-700">
            Once you logout, you'll need to login again.
          </p>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-red-500 w-full px-4 py-1.5 rounded-md text-white font-semibold cursor-pointer hover:opacity-80 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
