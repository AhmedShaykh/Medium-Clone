import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import Link from "next/link";

const tags = [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Nest.js",
    "Prisma",
    "PostgreSQL",
    "MongoDB"
];

const RecommendedTopics = () => {
    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>
                    Recommended Topics
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <Badge
                            className="font-light"
                            variant="secondary"
                            key={tag}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>

            <CardFooter>
                <Link
                    className="text-sm text-emerald-600"
                    href="/"
                >
                    See More Topics
                </Link>
            </CardFooter>
        </Card>
    )
};

export default RecommendedTopics;