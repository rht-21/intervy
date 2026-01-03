type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

const DottedButton = ({ text, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="rounded-sm flex-center border-2 border-dashed border-accent duration-300 transition-transform cursor-pointer uppercase font-mono font-medium tracking-wider hover:border-solid hover:bg-accent hover:text-accent-foreground"
    >
      {text}
    </button>
  );
};

export default DottedButton;
