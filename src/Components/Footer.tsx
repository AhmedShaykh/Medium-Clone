import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t py-4 px-8">
            <div
                className="flex flex-col items-center justify-between gap-x-3 gap-y-1 text-center text-xs text-muted-foreground sm:flex-row"
            >
                <p>
                    Medium &copy;{new Date().getFullYear()}. All Rights Reserved.
                </p>

                <p className="text-xs">
                    Developed By{" "}

                    <Link
                        className="text-primary transition-colors hover:text-accent-foreground"
                        href="http://github.com/AhmedShaykh"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Ahmed Saleem Shaikh
                    </Link>
                </p>
            </div>
        </footer>
    )
};

export default Footer;