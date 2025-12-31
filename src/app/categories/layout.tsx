import LinkToHome from "@/components/LinkToHome";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LinkToHome />

      {children}
    </div>
  );
}
