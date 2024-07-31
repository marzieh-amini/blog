import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { decodeToken } from "@/helpers/authentication";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookiesStore = cookies();
    // get token from cookie
    const token = cookiesStore.get("token")?.value;

    if (!token)
      return Response.json(
        { message: "Authorization required" },
        { status: 401 }
      );

    const decodedToken = await decodeToken(token);
    if (!decodedToken)
      return Response.json(
        { message: "Authorization required" },
        { status: 401 }
      );

    const user = await prisma.user.findFirst({
      where: {
        id: decodedToken.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
      },
    });

    return Response.json({ data: user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
