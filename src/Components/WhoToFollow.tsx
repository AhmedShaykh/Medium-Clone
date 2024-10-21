"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Spinner } from "@/Components/ui/spinner";
import { api } from "../../convex/_generated/api";
import { Button } from "@/Components/ui/button";
import { combineName } from "@/lib/utils";
import { useQuery } from "convex/react";
import Link from "next/link";

const WhoToFollow = () => {

    const users = useQuery(api.users.getRecentUsers);

    if (users === null) {

        return null;

    }

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>
                    Who To Follow
                </CardTitle>
            </CardHeader>

            <CardContent>
                {!users && <Spinner />}

                <ul className="flex flex-col gap-3">
                    {users?.map(user => (
                        <li key={user._id} className="flex items-center justify-between">
                            <div className="inline-flex items-center gap-2">
                                <Avatar className="size-5">
                                    <AvatarImage
                                        src={user?.imageUrl}
                                        alt={combineName(user)}
                                    />

                                    <AvatarFallback>
                                        {user?.firstName?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                                <h2 className="text-xs font-medium">
                                    {combineName(user)}
                                </h2>
                            </div>

                            <Button
                                className="rounded-full"
                                variant="outline"
                                size="sm"
                            >
                                Follow
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter>
                <Link
                    className="text-sm text-emerald-600"
                    href="/"
                >
                    See More Suggestions
                </Link>
            </CardFooter>
        </Card>
    )
};

export default WhoToFollow;