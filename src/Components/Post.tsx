"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { combineName, formatDate } from "@/lib/utils";
import { Spinner } from "@/Components/ui/spinner";
import { api } from "../../convex/_generated/api";
import Editor from "./Editor";
import { useMutation, useQuery } from "convex/react";
import { notFound } from "next/navigation";
import {
    Bookmark,
    Ellipsis,
    MessageSquare,
    Share,
    ThumbsUp
} from "lucide-react";

const Post = ({ slug }: { slug: string }) => {

    const post = useQuery(api.posts.getPostBySlug, { slug });

    const likePost = useMutation(api.posts.likePost);

    if (post === null) {

        notFound();

    }

    if (!post) {
        return (
            <section className="pb-24 pt-32 sm:pt-40">
                <div className="flex w-full items-center justify-center">
                    <Spinner size="lg" />
                </div>
            </section>
        )
    }

    return (
        <section className="pb-24 pt-32 sm:pt-40 px-8 flex w-full flex-col items-center justify-center">
            <div className="max-w-3xl">
                <h1 className="font-serif text-3xl font-bold">
                    {post.title}
                </h1>

                <p className="mt-3 text-muted-foreground">
                    {post.excerpt}
                </p>

                <div className="mt-6 inline-flex items-center gap-3">
                    <Avatar>
                        <AvatarImage
                            src={post.author?.imageUrl}
                            alt={combineName(post.author)}
                        />

                        <AvatarFallback>
                            {post.author?.firstName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <h2 className="text-lg">
                            {combineName(post.author)}
                        </h2>

                        <p className="text-sm font-light text-muted-foreground">
                            {formatDate(post._creationTime)}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex w-full items-center justify-between border-b border-t px-4 py-3">
                    <div className="flex items-center space-x-6">
                        <button
                            className="flex items-center gap-2 font-light text-muted-foreground hover:text-foreground"
                            onClick={async () => await likePost({ slug: post.slug })}
                        >
                            <ThumbsUp
                                className="size-5"
                                strokeWidth={1.5}
                            />

                            <span>
                                {post.likes}
                            </span>
                        </button>

                        <button className="flex items-center gap-2 font-light text-muted-foreground hover:text-foreground">
                            <MessageSquare
                                className="size-5"
                                strokeWidth={1.5}
                            />

                            <span>28</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="font-light text-muted-foreground hover:text-foreground">

                            <Bookmark
                                className="size-5"
                                strokeWidth={1.5}
                            />
                        </button>

                        <button className="font-light text-muted-foreground hover:text-foreground">
                            <Share
                                className="size-5"
                                strokeWidth={1.5}
                            />
                        </button>

                        <button className="font-light text-muted-foreground hover:text-foreground">
                            <Ellipsis
                                className="size-5"
                                strokeWidth={1.5}
                            />
                        </button>
                    </div>
                </div>

                {post.coverImageUrl && (
                    <div className="mt-16">
                        <img
                            src={post.coverImageUrl}
                            alt={post.title}
                        />
                    </div>
                )}

                <div className="mt-10">
                    <Editor
                        editable={false}
                        post={post}
                    />
                </div>
            </div>
        </section>
    )
};

export default Post;