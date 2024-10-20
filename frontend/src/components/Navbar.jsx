import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";
import { IoMdMenu } from "react-icons/io";
import { Separator } from "@/components/ui/separator";

import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { signoutSuccess } from "../redux/user/userSlice.js";

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get("searchTerm");
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await axios.post("/api/user/signout");

      if (res.statusText !== "OK") {
        console.log(res.data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`search?${searchQuery}`);
  };
  return (
    <div className="fixed z-20 w-full shadow-sm bg-clip-padding">
      <div
        className="p-3 sticky top-0  font-sans flex justify-around
     items-center    bg-opacity-10     backdrop-blur-xl"
      >
        <div>
          <Link
            to="/"
            className=" self-center whitespace-nowrap  text-sm sm:text-xl font-semibold  font-mono"
          >
            PROTECTIVE
          </Link>
        </div>
        <div className="flex gap-2 ">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-3xl bg-orange-600 dark:bg-orange-600 sm:bg-white sm:dark:bg-slate-900 p-2 sm:w-52">
              {/* Input field visible only on large screens */}
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search..."
                className="hidden lg:block bg-transparent border-none outline-none px-4  placeholder-slate-800 dark:placeholder-slate-300 w-full text-sm "
              />
              <span className="flex items-center justify-center lg:px-2 ">
                <AiOutlineSearch className="h-5 w-6 text-white sm:text-blue-600 sm:dark:text-blue-400 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 " />
              </span>
            </div>
          </form>
        </div>
        <div className="hidden gap-5 items-center font-medium lg:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-500"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/Features"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-500"
            }
          >
            Features
          </NavLink>
          <NavLink
            to="/emergency"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-red-500 rounded-md border-2 border-red-600 px-2"
                : "text-white bg-red-400 rounded-md border-2 border-red-500 hover:font-bold px-2 "
            }
          >
            Emergency
          </NavLink>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="icon"
            className={`h-10 w-8  p-1  transition-all hidden lg:block`}
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <Sun /> : <Moon />}
          </Button>

          {currentUser ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={currentUser.profilePicture} />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <span className="">@{currentUser.username}</span>
                </DropdownMenuLabel>

                <DropdownMenuItem>
                  <span className="trunate">{currentUser.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Link to={"/dashboard?tab=profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleSignout}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/sign-in">
              <Button className="border bg-black text-white dark:bg-white dark:text-black px-3 rounded-md">
                SignIn
              </Button>
            </Link>
          )}
        </div>

        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>
              <IoMdMenu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4 w-[180px] md:w-[300px]">
              <SheetClose asChild>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500 font-bold" : "text-gray-500"
                  }
                >
                  Home
                </NavLink>
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500 font-bold" : "text-gray-500"
                  }
                >
                  About
                </NavLink>
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <Link to="/features">Features</Link>
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <Link to="/emergency">Emergency</Link>
              </SheetClose>
              <Separator />
              <Button
                variant="outline"
                size="icon"
                className={`h-10 w-8  p-1  transition-all  sm:inline`}
                onClick={() => dispatch(toggleTheme())}
              >
                {theme === "light" ? <Sun /> : <Moon />}
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
