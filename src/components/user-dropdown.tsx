import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  LogOut as SignOutIcon,
  CircleUserRound as ProfileIcon,
  NotebookIcon as DiaryIcon,
  HeartIcon as FavoriteIcon,
  LockIcon as SecurityIcon,
  ShieldUserIcon as AdminIcon,
} from "lucide-react";

function initials(input: string) {
  return input
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}
export type UserDropdownProps = {
  onSignOut: () => void;
  user: {
    name: string;
    image?: string | null;
    email: string;
    role?: string | null
  };
};

export default function UserDropdown({ onSignOut, user }: UserDropdownProps) {

  //console.log("User Dropdown rendered");

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/account/profile">
            <DropdownMenuItem className="cursor-pointer">
              <ProfileIcon className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href="/account/my-diary">
            <DropdownMenuItem className="cursor-pointer">
              <DiaryIcon className="mr-2 h-4 w-4" />
              My Diary
            </DropdownMenuItem>
          </Link>
          <Link href="/account/favorites">
            <DropdownMenuItem className="cursor-pointer">
              <FavoriteIcon className="mr-2 h-4 w-4" />
              Favorites
            </DropdownMenuItem>
          </Link>
          <Link href="/account/security">
            <DropdownMenuItem className="cursor-pointer">
              <SecurityIcon className="mr-2 h-4 w-4" />
              Security
            </DropdownMenuItem>
          </Link>
          {user.role === "admin" &&
            <Link href="/account/admin">
              <DropdownMenuItem className="cursor-pointer">
                <AdminIcon className="mr-2 h-4 w-4" />
                Admin
              </DropdownMenuItem>
            </Link>
          }
          <DropdownMenuItem onClick={onSignOut} className="cursor-pointer">
            <SignOutIcon className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
