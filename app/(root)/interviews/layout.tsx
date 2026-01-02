import { auth } from "@/auth";
import { AuthModalTrigger } from "@/components/molecules/auth-modal-trigger";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <main className="font-sans">
      <AuthModalTrigger shouldOpen={!session} />
      {children}
    </main>
  );
};

export default RootLayout;
