import '../styles/globals.css';

export const metadata = {
  title: 'Devline.io',
  description: 'Learn to code the right way',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
