import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";

const onUpload = (file: File) => {
    const promise = fetch("/api/upload", {
        method: "POST",
        headers: {
            "content-type": file?.type || "application/octet-stream",
            "x-vercel-filename": file?.name || "image.png",
        },
        body: file
    });

    return new Promise((resolve, reject) => {
        toast.promise(
            promise.then(async (res) => {

                if (res.status === 200) {

                    const { url } = (await res.json()) as { url: string };

                    const image = new Image();

                    image.src = url;

                    image.onload = () => {
                        resolve(url);
                    };

                } else if (res.status === 401) {

                    resolve(file);

                    throw new Error("`BLOB_READ_WRITE_TOKEN` Environment Variable Not Found, Reading Image Locally Instead.");

                } else {

                    throw new Error("Error Uploading Image... Please Try Again.");

                }

            }), {
            loading: "Uploading Image...",
            success: "Image Uploaded Successfully.",
            error: (e) => {
                reject(e);
                return e.message;
            }
        });
    });
};

export const uploadFn = createImageUpload({
    onUpload,
    validateFn: (file) => {

        if (!file.type.includes("image/")) {

            toast.error("File Type Not Supported.");

            return false;

        }

        if (file.size / 1024 / 1024 > 20) {

            toast.error("File Size Too Big (Max 20MB).");

            return false;

        }

        return true;

    }
});