import { cn } from "@/lib/utils";

type PageProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

const Page: React.FC<PageProps> = ({ id, className, children, ...props }) => {
  return (
    <div
      id={id}
      className={cn(`@container/${id} w-full`, className)}
      {...props}
    >
      {children}
    </div>
  );
};

const PageHeader: React.FC<React.ComponentProps<"h1">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h1
      className={cn("text-2xl font-bold dark:text-white", className)}
      {...props}
    >
      {children}
    </h1>
  );
};

const PageSubtitle: React.FC<React.ComponentProps<"h2">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h2
      className={cn("text-lg font-medium text-muted-foreground", className)}
      {...props}
    >
      {children}
    </h2>
  );
};

const PageContent: React.FC<React.ComponentProps<"div">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("mt-4", className)} {...props}>
      {children}
    </div>
  );
};

export { Page, PageHeader, PageSubtitle, PageContent };
