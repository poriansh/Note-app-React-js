type MassageProps = {
  children: React.ReactNode;
};

function Massage({ children } : MassageProps) {
  return <div className="not-massage">{children}</div>;
}

// childern props 
export default Massage
