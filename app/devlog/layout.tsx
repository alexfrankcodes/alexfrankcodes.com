import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DevlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-column px-6">
      <Header />
      <main className="py-14 sm:py-16">{children}</main>
      <Footer />
    </div>
  );
}
