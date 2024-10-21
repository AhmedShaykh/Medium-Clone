import NewPostForm from "@/Components/NewPostForm";

const Write = () => {
    return (
        <section className="pb-24 pt-32 sm:pt-40 flex flex-col justify-center items-center w-full">
            <div className="max-w-4xl">
                <h1 className="mb-8 text-center font-serif text-5xl font-medium">
                    New Post
                </h1>

                <NewPostForm />
            </div>
        </section>
    )
};

export default Write;