export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">
        <div className="container mx-auto">{children}</div>
      </body>
    </html>
  );
}
