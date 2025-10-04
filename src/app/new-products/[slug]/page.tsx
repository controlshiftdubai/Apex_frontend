import { ProductHandler } from "@/utils/api/handlers/product";
import { APP_URL } from "@/lib/constant";
import { Product } from "@/types/product";
import { Metadata } from "next";
import Client from "./client";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;

  try {
    const { data } = await ProductHandler.getSingle({
      payload: { idOrSlug: slug },
    });
    const product = data.payload as Product;

    return {
      title: product.name,
      description: product.description,
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata for post:", slug, error);

    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await ProductHandler.getSingle({
    payload: { idOrSlug: slug },
  });

  return <Client product={data.payload} />;
}

export const generateStaticParams = async () => {
  const { data } = await ProductHandler.getSlugs({ payload: {} });
  const products = data.payload;

  return products.map(({ slug }) => ({ slug }));
};
