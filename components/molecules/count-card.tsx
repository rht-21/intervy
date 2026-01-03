import React from "react";

type CountCardProps = React.HTMLProps<HTMLDivElement> & {
  title: string;
  count: number;
  titleClass?: string;
  countClass?: string;
};

const CountCard = ({
  title,
  count,
  titleClass,
  countClass,
  ...props
}: CountCardProps) => {
  return (
    <div
      {...props}
      role="card"
      className={`bg-card p-4 rounded-md space-y-2 ${props.className ?? ""}`}
    >
      <h3
        className={`text-sm uppercase font-semibold tracking-wide text-muted-foreground ${
          titleClass ?? ""
        }`}
      >
        {title}
      </h3>
      <p className={`text-4xl font-bold ${countClass ?? ""}`}>{count}</p>
    </div>
  );
};

export default CountCard;
