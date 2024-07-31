import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (id) {
    const post = await prisma.post.findFirst({
      where: { id: Number(id) },
      include: {
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    if (!post) {
      return Response.json({ error: "Not Found" });
    }
    return Response.json(post);
  }
  Response.json({});
}
