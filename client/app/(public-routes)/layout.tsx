import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PublicRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}