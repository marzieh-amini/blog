import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
interface IRegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}
export async function POST(req: Request) {
  try {
    const data: IRegisterData = await req.json();
    if (!data.email || !data.name || !data.password) {
      return Response.json(
        { message: "please fill all the fields" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (user)
      return Response.json({ message: "user already exists" }, { status: 400 });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        phone: data.phone || "",
      },
    });
    return Response.json(
      { message: "user created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
