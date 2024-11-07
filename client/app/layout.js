import { AuthProvider } from "../context/AuthContext";
import AppBar from "../components/layout/AppBar.jsx"; // Import the AppBar component
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* Render the AppBar on pages that aren't login or signup */}
          <div className="flex flex-col min-h-screen">
            {/* Conditionally render AppBar for non-login/signup pages */}

            {children?.props?.pageType !== "auth" && <AppBar />}
            {/* Main content */}
            <main className="flex-1">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
