"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Spinner } from "@/Components/ui/spinner";
import { api } from "../../convex/_generated/api";
import { combineName } from "@/lib/utils";
import { useQuery } from "convex/react";
import Link from "next/link";

const RecentPosts = () => {

    const posts = useQuery(api.posts.getRecentPosts);

    if (posts === null) {

        return null;

    }

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>
                    Staff Picks
                </CardTitle>

                <CardContent className="p-0">
                    {!posts && <Spinner />}

                    <ul className="flex flex-col">
                        {posts?.map(post => (
                            <li key={post._id}>
                                <Link
                                    className="block py-3 hover:bg-muted"
                                    href={`/posts/${post.slug}`}
                                >
                                    <div className="inline-flex items-center gap-3">
                                        <Avatar className="size-5">
                                            <AvatarImage
                                                src={post.author?.imageUrl}
                                                alt={combineName(post.author)}
                                            />

                                            <AvatarFallback>
                                                {post.author?.firstName?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <h2 className="text-sm leading-3">
                                            {combineName(post.author)}
                                        </h2>
                                    </div>

                                    <h3 className="text-sm font-semibold">
                                        {post.title}
                                    </h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </CardHeader>

            <CardFooter>
                <Link
                    className="text-sm text-emerald-600"
                    href="/"
                >
                    See The Full List
                </Link>
            </CardFooter>
        </Card>
    )
};

export default RecentPosts;