

type props = {
  children: React.ReactNode;
};

export default function Protected({ children }: props) {
  return <>{children}</>;
}
