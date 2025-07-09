import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Sidebar_admin } from "@/components/sidebar/admin/sidebar_admin";
import { MobileHeader } from "@/components/sidebar/admin/admin_mobile_header";

type Props = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/portal2"); // not logged in
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const role = user?.publicMetadata?.role;

  if (role !== "admin") {
    redirect("/"); // unauthorized
  }

  return (
    <>
      <MobileHeader />
      <Sidebar_admin className="hidden lg:flex" />
      <main className="lg:pl-[300px] h-full">
        <div className="min-h-screen w-full flex flex-row bg-lGreen">
          {children}
        </div>
      </main>
    </>
  );
}
