import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { Menu } from "lucide-react";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton
} from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/20 py-4 backdrop-blur-sm px-8">
            <nav className="flex items-center justify-between">
                <Sheet>
                    <SheetTrigger className="sm:hidden">
                        <Menu className="h-6 w-6" />
                    </SheetTrigger>

                    <SheetContent side="left">
                        <ul className="flex flex-col gap-3 text-sm">
                            <li className="font-serif text-2xl font-semibold">
                                <SheetClose asChild>
                                    <Link href="/">
                                        Medium
                                    </Link>
                                </SheetClose>
                            </li>
                        </ul>
                    </SheetContent>
                </Sheet>

                <ul className="hidden items-center gap-14 text-sm font-medium sm:flex">
                    <li className="font-serif text-xl font-semibold">
                        <Link href="/">
                            Medium
                        </Link>
                    </li>
                </ul>

                <div className="flex items-center justify-between gap-6">
                    <ThemeToggle />

                    <Button size="sm" variant="secondary" asChild>
                        <Link href="/write">Write</Link>
                    </Button>

                    <SignedOut>
                        <SignInButton>
                            <Button size="sm">Sign In</Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
        </header>
    )
};

export default Navbar;