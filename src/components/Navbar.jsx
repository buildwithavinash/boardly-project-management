import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { user, userInfo } = useAuth();
  console.log("user", user);
  return (
    <div className="bg-blue-100/20 border border-slate-300/20 fixed top-0 left-0 right-0 flex justify-between items-center py-1 px-2 backdrop-blur-md">
      <div className="">
        <h3 className="text-2xl">Hello, {userInfo?.name}</h3>
      </div>
    </div>
  );
};

export default Navbar;
