"use client";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Spinner } from "@/Components/ui/spinner";
import { Button } from "@/Components/ui/button";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface ImageUploaderProps {
    setImageId: (url: string) => void;
};

const ImageUploader = ({ setImageId }: ImageUploaderProps) => {

    const generateUploadUrl = useMutation(api.posts.generateUploadUrl);

    const [data, setData] = useState<{ image: string | null }>({
        image: null
    });

    const [file, setFile] = useState<File | null>(null);

    const [dragActive, setDragActive] = useState(false);

    const onChangePicture = useCallback((event: ChangeEvent<HTMLInputElement>) => {

        const file = event.currentTarget.files && event.currentTarget.files[0];

        if (file) {

            if (file.size / 1024 / 1024 > 50) {

                toast.error("File Size Too Big (Max 50MB)");

            } else {

                setFile(file);

                const reader = new FileReader();

                reader.onload = e => {

                    setData(prev => ({ ...prev, image: e.target?.result as string }));

                };

                reader.readAsDataURL(file);

            }

        };

    }, [setData]);

    const [saving, setSaving] = useState(false);

    const saveDisabled = useMemo(() => {

        return !data.image || saving;

    }, [data.image, saving]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();

        e.stopPropagation();

        setSaving(true);

        try {

            const postUrl = await generateUploadUrl();

            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file!.type },
                body: file
            });

            const { storageId } = await result.json();

            setImageId(storageId);

            toast.success(`File Uploaded Successfully!`);

        } catch (error) {

            console.error(error);

            toast.error("Failed To Upload Image");

        } finally {

            setSaving(false);

        }

    };

    return (
        <form
            className="grid gap-4"
            onSubmit={handleSubmit}
        >
            <div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">
                        Upload An Image
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground/60">
                        Accepted Formats: .PNG, .JPG, .WEBP
                    </p>
                </div>

                <label
                    className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border shadow-sm transition-all"
                    htmlFor="image-upload"
                >
                    <div
                        className="absolute z-[5] h-full w-full rounded-md"
                        onDragOver={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            setDragActive(true)
                        }}
                        onDragEnter={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            setDragActive(true)
                        }}
                        onDragLeave={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            setDragActive(false)
                        }}
                        onDrop={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            setDragActive(false)

                            const file = e.dataTransfer.files && e.dataTransfer.files[0];

                            if (file) {

                                if (file.size / 1024 / 1024 > 50) {

                                    toast.error("File Size Too Big (max 50MB)");

                                } else {

                                    setFile(file);

                                    const reader = new FileReader();

                                    reader.onload = e => {
                                        setData(prev => ({
                                            ...prev,
                                            image: e.target?.result as string
                                        }))
                                    }

                                    reader.readAsDataURL(file);

                                }
                            }
                        }}
                    />

                    <div
                        className={`${dragActive ? "border-2" : ""} absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all 
                        ${data.image ? "bg-background/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md" : "bg-background opacity-100 hover:bg-muted"}`}
                    >
                        <svg
                            className={`${dragActive ? "scale-110" : "scale-100"} h-8 w-8 text-muted-foreground transition-all group-hover:scale-110 group-active:scale-95`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                            <path d="M12 12v9" />
                            <path d="m16 16-4-4-4 4" />
                        </svg>

                        <p className="mt-2 text-center text-sm text-muted-foreground">
                            Drag & Drop Or Click To Upload.
                        </p>

                        <p className="mt-1 text-center text-xs text-muted-foreground/60">
                            Max File Size: 50MB
                        </p>

                        <span className="sr-only">
                            Photo Upload
                        </span>
                    </div>

                    {data.image && (
                        <img
                            className="h-full w-full rounded-md object-cover"
                            src={data.image}
                            alt="Preview"
                        />
                    )}
                </label>

                <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                        onChange={onChangePicture}
                        className="sr-only"
                        id="image-upload"
                        accept="image/*"
                        name="image"
                        type="file"
                    />
                </div>
            </div>

            <Button disabled={saveDisabled}>
                {saving ? (
                    <p className="flex items-center gap-2 text-sm">
                        <Spinner size="sm" />

                        <span>
                            Uploading...
                        </span>
                    </p>
                ) : (
                    <p className="text-sm">
                        Confirm Upload
                    </p>
                )}
            </Button>
        </form>
    )
};

export default ImageUploader;