export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="font-sans">{children}</main>;
}
