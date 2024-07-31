import { encodeToken } from "@/helpers/authentication";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

interface ILoginData {
  email: string;
  password: string;
}
export async function POST(req: Request) {
  try {
    const setCookies = cookies();
    const data: ILoginData = await req.json();
    if (!data.email || !data.password)
      return Response.json(
        { message: "please fill all the fields" },
        { status: 400 }
      );

    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user)
      return Response.json({ message: "user not found" }, { status: 404 });
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid)
      return Response.json({ message: "password not valid" }, { status: 400 });

    const token = await encodeToken(user.id);
    setCookies.set("token", token, { httpOnly: true, path: "/" });
    return Response.json(
      { message: "user logged in successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
