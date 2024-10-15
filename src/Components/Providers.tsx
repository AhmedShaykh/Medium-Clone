"use client";
import { Toaster } from "@/Components/ui/sonner";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { useTheme } from "next-themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
            < ToasterProvider />
        </ConvexProviderWithClerk>
    )
};

function ToasterProvider() {

    const { resolvedTheme } = useTheme();

    return (
        <Toaster
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            position="top-center"
            closeButton
        />
    )
};