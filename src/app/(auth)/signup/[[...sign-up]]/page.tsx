import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <section className="grow py-24">
            <div className="flex items-center justify-center">
                <SignUp />
            </div>
        </section>
    )
};