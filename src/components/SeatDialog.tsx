import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SeatDialogProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
}

export function SeatDialog({ trigger, children }: SeatDialogProps) {
  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
