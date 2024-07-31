import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const getPosts = searchParams.get("posts");
  if (id) {
    if (getPosts) {
      const postsUser = await prisma.post.findMany({
        where: { authorId: Number(id) },
      });
      return Response.json(postsUser);
    }
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      return Response.json({ error: "Not found" });
    }
    return Response.json(user);
  } else {
    const user = await prisma.user.findMany();
    return Response.json(user);
  }
}
export async function POST() {
  const user = await prisma.user.create({
    data: {
      email: "ba.amini.it@gmail.com",
      name: "bahar amini",
      password: "123",
      phone: "",
    },
  });
  return Response.json(user);
}
