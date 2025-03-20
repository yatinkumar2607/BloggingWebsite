"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface ArticleDetailsProps {
  article: any; // Using any for now, but you can define a more specific type
}

const ArticleDetails = ({ article }: ArticleDetailsProps) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Extract content from blocks if available
  const getContent = () => {
    if (article.blocks && article.blocks.length > 0) {
      return article.blocks
        .filter((block: any) => block.__component === "shared.rich-text")
        .map((block: any) => block.body)
        .join("\n\n");
    }
    return article.description || "No content available for this article.";
  };

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-10 py-8 text-[#d9d9d9]">
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Article metadata */}
        <div className="flex items-center space-x-4">
          {article.author && (
            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={
                    article.author.avatar?.url ||
                    "/placeholder.svg?height=40&width=40"
                  }
                  alt={article.author.name || "Author"}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">{article.author.name}</span>
            </div>
          )}
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-400">
            {formatDate(article.publishedAt)}
          </span>

          {article.category && (
            <>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-blue-400">
                {article.category.name}
              </span>
            </>
          )}
        </div>

        {/* Article content */}
        <motion.div
          className="prose prose-lg prose-invert max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {getContent()
            .split("\n")
            .map((paragraph: string, index: number) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
        </motion.div>

        {/* Tags if available */}
        {article.tags && article.tags.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {article.tags.map((tag: any) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-gray-800 rounded-full text-sm"
              >
                {tag.name}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default ArticleDetails;
