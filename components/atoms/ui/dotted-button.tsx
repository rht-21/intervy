const DottedButton = ({ text }: { text: string }) => {
  return (
    <button className="rounded-sm flex-center h-24 border-2 border-dashed border-accent duration-300 transition-transform cursor-pointer uppercase font-mono font-medium tracking-wider hover:border-solid hover:bg-accent hover:text-accent-foreground">
      {text}
    </button>
  );
};

export default DottedButton;
