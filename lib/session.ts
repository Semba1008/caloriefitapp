import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/** ログイン中のユーザーを取得。未ログインなら/loginへリダイレクト */
export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    redirect("/login");
  }

  return user;
}

/** requireUserに加え、オンボーディング(プロフィール入力)完了を必須にする */
export async function requireOnboardedUser() {
  const user = await requireUser();
  if (user.heightCm == null || user.weightKg == null || user.age == null || user.sex == null || user.activityLevel == null) {
    redirect("/onboarding");
  }
  return user as typeof user & {
    heightCm: number;
    weightKg: number;
    age: number;
    sex: NonNullable<typeof user.sex>;
    activityLevel: NonNullable<typeof user.activityLevel>;
  };
}
