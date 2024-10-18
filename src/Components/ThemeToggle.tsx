"use client";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const ThemeToggle = () => {

    const { setTheme, resolvedTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {

        setMounted(true);

    }, [])

    if (!mounted) {

        return null;

    }

    return (
        <Button
            onClick={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }}
            variant="ghost"
            size="sm"
        >
            {resolvedTheme === "dark" ? (
                <SunIcon className="size-4 text-orange-300" />
            ) : (
                <MoonIcon className="size-4 text-sky-950" />
            )}

            <span className="sr-only">Toggle Theme</span>
        </Button>
    )
};

export default ThemeToggle;