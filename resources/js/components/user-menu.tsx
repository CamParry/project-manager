import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { LogOutIcon, UserIcon } from "lucide-react";

export function UserMenu() {
    return (
        <Menu>
            <MenuButton className="icon-button">
                <UserIcon className="size-5" />
            </MenuButton>
            <MenuItems
                anchor="bottom end"
                className="border-buter-buted w-36 rounded-lg border border-border-muted bg-bg p-1 shadow-lg [--anchor-gap:--spacing(1)] focus-visible:outline-none"
            >
                <MenuItem>
                    <Link
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-text hover:bg-bg-muted"
                        href={route("profile.edit")}
                    >
                        <UserIcon className="size-5 text-text-muted" />
                        Profile
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-text hover:bg-bg-muted"
                        method="post"
                        href={route("logout")}
                    >
                        <LogOutIcon className="size-5 text-text-muted" />
                        Log Out
                    </Link>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}
