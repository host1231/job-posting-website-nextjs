import { getServerSession } from "next-auth"
import { authOptions } from "./authOptions"

const isAdmin = async () => {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "admin"
}

export default isAdmin