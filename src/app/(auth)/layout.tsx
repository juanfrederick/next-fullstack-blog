export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex">
      <div className="hidden md:block md:w-[40%] h-full bg-secondary"></div>
      <div className="w-full md:w-[60%] h-full relative background-image">
        {children}
      </div>
    </section>
  );
}
