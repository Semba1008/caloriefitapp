import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function RootPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  const isOnboarded =
    user?.heightCm != null &&
    user?.weightKg != null &&
    user?.age != null &&
    user?.sex != null &&
    user?.activityLevel != null;

  redirect(isOnboarded ? "/dashboard" : "/onboarding");
}
