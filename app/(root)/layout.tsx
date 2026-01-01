import Navbar from "@/components/organisms/navbar/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="font-sans">
      <Navbar />
      {children}
    </main>
  );
}
