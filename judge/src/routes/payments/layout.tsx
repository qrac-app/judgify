//layout.tsx
import { AutumnProvider } from "autumn-js/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html>
      <body>
        <AutumnProvider>
          {children}
        </AutumnProvider>
      </body>
    </html>
  );
}