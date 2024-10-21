import { Button } from "@/Components/ui/button";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton
} from "@clerk/nextjs";

const Navbar = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/20 py-4 backdrop-blur-sm px-8">
            <nav className="flex items-center justify-between">
                <ul className="flex items-center gap-14 text-sm font-medium">
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