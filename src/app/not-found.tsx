import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const NotFound = () => {
    return (
        <section className="pb-24 pt-32 sm:pt-40">
            <div className="min-h-full px-4 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
                <div className="mx-auto max-w-max">
                    <main className="sm:flex">
                        <p className="text-4xl font-bold tracking-tight text-muted-foreground sm:text-5xl">
                            404
                        </p>

                        <div className="sm:ml-6">
                            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                                    Page Not Found
                                </h1>

                                <p className="mt-3 text-base text-muted-foreground">
                                    Please Check The URL In The Address Bar & Try Again.
                                </p>
                            </div>

                            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                                <Link
                                    className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                                    href="/"
                                >
                                    <ArrowLeftIcon className="h-5 w-5" />

                                    <span>
                                        Go Back Home
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </section>
    )
};

export default NotFound;