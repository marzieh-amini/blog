import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookiesStore = cookies();
    // clear the cookie "token"
    cookiesStore.delete("token");
    // res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0`);
    return Response.json(
      { message: "user logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
