import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Separator } from "@/Components/ui/separator";
import { combineName, formatDate } from "@/lib/utils";
import { Post } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import {
    MessageSquare,
    Sparkle,
    ThumbsUp
} from "lucide-react";

const PostItem = ({ post }: { post: Post }) => {
    return (
        <li className="mb-4 pb-10 pt-5 sm:border-b">
            <Link href={`/posts/${post.slug}`} className="block">
                <div className="inline-flex items-center gap-3">
                    <Avatar className="size-6">
                        <AvatarImage
                            src={post.author?.imageUrl}
                            alt={combineName(post.author)}
                        />

                        <AvatarFallback>
                            {post.author?.firstName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <h2 className="text-sm">{combineName(post.author)}</h2>
                    </div>
                </div>

                <div className="mt-2 flex flex-col-reverse gap-x-10 sm:mt-4 sm:flex-row sm:items-center">
                    <div className="mt-4 w-full sm:mt-0 sm:w-3/4">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold">
                                {post.title}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                {post.excerpt}
                            </p>
                        </div>

                        <div className="mt-7 flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                                <Sparkle className="h-4 w-4 fill-yellow-500 text-yellow-500" />

                                <span>{formatDate(post._creationTime)}</span>

                                <Separator orientation="vertical" className="h-4" />

                                <div className="flex items-center gap-2">
                                    <ThumbsUp className="h-4 w-4" />

                                    <span>{post.likes}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />

                                    <span>28</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-video w-full sm:w-1/4">
                        {post.coverImageUrl && (
                            <Image
                                className="h-full w-full rounded-md object-cover"
                                src={post.coverImageUrl}
                                alt=""
                                fill
                            />
                        )}
                    </div>
                </div>
            </Link>
        </li>
    )
};

export default PostItem;