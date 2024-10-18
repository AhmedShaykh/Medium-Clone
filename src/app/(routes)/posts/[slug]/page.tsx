import Post from "@/Components/Post";

const PostPage = ({ params }: { params: { slug: string } }) => {

    const { slug } = params;

    return <Post slug={slug} />;
};

export default PostPage;