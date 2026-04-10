import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MDXContent } from "@/components/mdx-content";
import { ShareButtons } from "@/components/share-buttons";
import { BlogCard } from "@/components/blog-card";
import {
  getPostBySlug,
  getRelatedPosts,
  getAllPosts,
  formatDate,
} from "@/lib/blog";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Kartikay Sharma"],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <article className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          className="mb-8 gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-10">
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>

          <h1 className="mb-6 text-balance font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Kartikay Sharma</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative mb-12 aspect-video overflow-hidden rounded-xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="mb-12">
          <MDXContent content={post.content} />
        </div>

        {/* Share Section */}
        <div className="mb-16 flex flex-col items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-6 sm:flex-row">
          <div>
            <p className="font-medium text-foreground">Enjoyed this article?</p>
            <p className="text-sm text-muted-foreground">
              Share it with your network
            </p>
          </div>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
              Related Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard
                  key={relatedPost.slug}
                  post={relatedPost}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
