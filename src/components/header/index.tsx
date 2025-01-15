import { NavLink } from "react-router-dom";
import Container from "../ui/container";
import logo from "@/assets/logo-big.svg";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/supabase/auth";
import { Button } from "../ui/button";
import { userAtom } from "@/store/auth";
import { useAtom } from "jotai";

const Header: React.FC = () => {
  const [user] = useAtom(userAtom);

  const { mutate: handleLogoutMutation } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });

  return (
    <header className="w-full bg-customGray py-2  rounded-bl-[24px] rounded-br-[24px]">
      <Container>
        <div className="flex items-center w-full">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>

          <div className="text-white flex-1 ">
            <nav className="flex gap-6 justify-center">
              <NavLink className="text-white text-xl" to="lessons">
                Lessons
              </NavLink>
              <NavLink className="text-white text-xl" to="lessons">
                Lessons
              </NavLink>
              <NavLink className="text-white text-xl" to="lessons">
                Lessons
              </NavLink>
              {!user ? (
                <Button>
                  <NavLink to="/login">Login</NavLink>
                </Button>
              ) : (
                <div>
                  <Button onClick={() => handleLogoutMutation()}>Logout</Button>
                  <NavLink to="/profile">Profile</NavLink>
                </div>
              )}{" "}
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
