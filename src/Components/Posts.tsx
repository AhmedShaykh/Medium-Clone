"use client";
import { api } from "../../convex/_generated/api";
import { Spinner } from "@/Components/ui/spinner";
import PostItem from "./PostItem";
import { useQuery } from "convex/react";

const Posts = () => {

    const posts = useQuery(api.posts.getPosts);

    if (!posts) {
        return (
            <div className="flex h-40 items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    return (
        <ul>
            {posts.map(post => (
                <PostItem key={post._id} post={post} />
            ))}
        </ul>
    )
};

export default Posts;