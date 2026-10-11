import Navbar from '@/src/components/Navbar';

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar variant="light" />

      {children}
    </>
  );
}