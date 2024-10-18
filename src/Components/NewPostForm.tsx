"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { Id } from "../../convex/_generated/dataModel";
import { Spinner } from "@/Components/ui/spinner";
import { api } from "../../convex/_generated/api";
import { Button } from "@/Components/ui/button";
import { createSlugFromName } from "@/lib/utils";
import { newPostSchema } from "@/lib/schemas";
import { Input } from "@/Components/ui/input";
import ImageUploader from "./ImageUploader";
import Editor from "./Editor";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSONContent } from "novel";
import { toast } from "sonner";
import { z } from "zod";

type Inputs = z.infer<typeof newPostSchema>;

const NewPostForm = () => {

    const [filePickerIsOpen, setFilePickerIsOpen] = useState(false);

    const createPost = useMutation(api.posts.createPost);

    const router = useRouter();

    const {
        watch,
        register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<Inputs>({
        resolver: zodResolver(newPostSchema),
        defaultValues: {}
    });

    function setCoverImageId(url: string) {

        setValue("coverImageId", url);

        setFilePickerIsOpen(false);

    };

    function setContent(content: JSONContent) {

        setValue("content", content, { shouldValidate: true });

    };

    const title = watch("title");

    useEffect(() => {

        if (title) {

            const slug = createSlugFromName(title);

            if (slug) {

                setValue("slug", slug, { shouldValidate: true });

            }

        }

    }, [title]);

    const processForm: SubmitHandler<Inputs> = async data => {

        const contentJson = data.content;

        const hasContent = contentJson?.content?.some(
            c => c.content && c.content.length > 0
        );

        if (!hasContent) {

            toast.error("Please Add Some Content To The Post");

            return;

        }

        try {

            const postSlug = await createPost({
                ...data,
                coverImageId: data.coverImageId as Id<"_storage"> | undefined,
                content: JSON.stringify(contentJson)
            });

            if (!postSlug) throw new Error("Failed To Create Post");

            router.push(`/posts/${postSlug}`);

            toast.success("Post Created!");

        } catch (error) {

            toast.error("Failed To Create Post");

        }

    };

    return (
        <form
            onSubmit={handleSubmit(processForm)}
        >
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                    <div className="w-full">
                        <Input
                            placeholder="Select A Cover Image"
                            {...register("coverImageId")}
                            className="w-full"
                            type="text"
                            disabled
                        />

                        {errors.coverImageId?.message && (
                            <p className="mt-1 px-2 text-xs text-red-400">
                                {errors.coverImageId.message}
                            </p>
                        )}
                    </div>

                    <Dialog open={filePickerIsOpen} onOpenChange={setFilePickerIsOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm">Select File</Button>
                        </DialogTrigger>

                        <DialogContent>
                            <ImageUploader
                                setImageId={setCoverImageId}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div className="flex-1">
                        <Input
                            placeholder="Post Title"
                            {...register("title")}
                            type="text"
                        />

                        {errors.title?.message && (
                            <p className="mt-1 px-2 text-xs text-red-400">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div className="flex-1">
                        <Input
                            placeholder="Post Slug"
                            {...register("slug")}
                            type="text"
                        />

                        {errors.slug?.message && (
                            <p className="mt-1 px-2 text-xs text-red-400">
                                {errors.slug.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <Input
                        placeholder="Post Excerpt"
                        {...register("excerpt")}
                        type="text"
                    />

                    {errors.excerpt?.message && (
                        <p className="mt-1 px-2 text-xs text-red-400">
                            {errors.excerpt.message}
                        </p>
                    )}
                </div>

                <div>
                    <Editor
                        editable={true}
                        setContent={setContent}
                    />
                </div>

                <div>
                    <Button
                        className="w-full"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        {isSubmitting ? (
                            <>
                                <Spinner className="mr-2" />

                                <span>
                                    Creating Post...
                                </span>
                            </>
                        ) : (
                            "Create Post"
                        )}
                    </Button>
                </div>
            </div>
        </form>
    )
};

export default NewPostForm;