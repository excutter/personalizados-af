import { AlertDialogRootProps } from "@base-ui/react";
import {
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
} from "./ui/alert-dialog";
import { CircleAlert, Trash2Icon } from "lucide-react";

type Variant = "destructive" | "default";

type AlertProps = {
  variant: Variant;
  title: string;
  description: string;
  trigger?: React.ReactElement;
  onConfirm: () => void;
};

type DynamicAlertProps<Payload> = AlertDialogRootProps<Payload> & {
  variant: Variant;
  title: (payload: Payload) => string;
  description: (payload: Payload) => string;
  onConfirm: (payload: Payload) => void;
};

const dialogMediaClass: Record<Variant, string> = {
  destructive:
    "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive",
  default: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary",
};

const Alert: React.FC<AlertProps> = ({
  variant = "default",
  title,
  description,
  trigger,
  onConfirm,
}) => {
  return (
    <AlertDialog>
      {trigger && <AlertDialogTrigger render={trigger} />}
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className={dialogMediaClass[variant]}>
            {variant === "destructive" && <Trash2Icon size={18} />}
            {variant === "default" && <CircleAlert size={18} />}
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogCancel variant={variant} onClick={onConfirm}>
            Confirm
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DynamicAlert = <Payload,>(props: DynamicAlertProps<Payload>) => {
  const { variant, title, description, onConfirm, ...rest } = props;

  return (
    <AlertDialog {...rest}>
      {({ payload }: { payload: unknown }) => (
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className={dialogMediaClass[variant]}>
              {variant === "destructive" && <Trash2Icon size={18} />}
              {variant === "default" && <CircleAlert size={18} />}
            </AlertDialogMedia>
            <AlertDialogTitle>{title(payload as Payload)}</AlertDialogTitle>
            <AlertDialogDescription>
              {description(payload as Payload)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogCancel
              variant={variant}
              onClick={() => onConfirm(payload as Payload)}
            >
              Confirm
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};

export default Alert;
