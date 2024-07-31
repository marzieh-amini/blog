"use server";

import { getUserID } from "@/helpers/authentication";
import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();
export const addPost = async (data: FormData) => {
  // Post new Post to prisma
  const title = data.get("title")?.toString();
  const content = data.get("content")?.toString();
  const published = data.get("published")?.toString();

  if (title && content) {
    const token = cookies().get("token")?.value;

    const userId = await getUserID(token);
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published ? true : false,
        authorId: userId as number,
      },
    });
  }
  // Refetch Post's
  revalidateTag("POSTS");
  // Redirect them back to the Homepage
  redirect("/");
};
