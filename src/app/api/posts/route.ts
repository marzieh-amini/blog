import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { getUserID } from "@/helpers/authentication";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true, id: true } } },
  });
  return Response.json(posts);
}
export async function POST(req: Request) {
  const cookiesStore = cookies();
  const { title, content, published } = await req.json();
  const userId = await getUserID(cookiesStore.get("token")?.value);

  const post = await prisma.post.create({
    data: { title, content, authorId: userId as number, published },
  });
  return Response.json(post);
}

export async function PUT(req: Request) {
  const { id, title, content, published } = await req.json();
  const data = await prisma.post.update({
    where: { id },
    data: { title, content, published },
  });
  return Response.json(data);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const data = await prisma.post.delete({ where: { id } });
  return Response.json(data);
}
