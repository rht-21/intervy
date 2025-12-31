import Navbar from "@/components/organisms/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="font-sans">
      <Navbar />
      <section className="pt-20">{children}</section>
    </main>
  );
}
