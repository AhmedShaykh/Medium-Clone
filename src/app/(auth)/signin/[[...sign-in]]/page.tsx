import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <section className="grow py-24">
            <div className="container flex items-center justify-center">
                <SignIn />
            </div>
        </section>
    )
};