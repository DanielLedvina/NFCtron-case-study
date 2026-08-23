import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { login } from "@/api/auth";
import { ApiError } from "@/api/errors";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface LoginDrawerProps {
  trigger: React.ReactElement;
}

function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login({ email, password });
      toast.add({ description: "Přihlášení proběhlo úspěšně." });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Přihlášení se nezdařilo.";
      toast.add({ description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { email, setEmail, password, setPassword, isSubmitting, handleSubmit };
}

function LoginFormFields({
  email,
  setEmail,
  password,
  setPassword,
}: {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="login-email">E-mailová adresa</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="např. vase@email.cz"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="login-password">Heslo</Label>
        <Input
          id="login-password"
          type="password"
          placeholder="Zadejte své heslo"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
    </>
  );
}

export const LoginDrawer = ({ trigger }: LoginDrawerProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { email, setEmail, password, setPassword, isSubmitting, handleSubmit } =
    useLoginForm();

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger render={trigger} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vítejte zpět!</DialogTitle>
            <DialogDescription>
              Přihlaste se a uvidíte všechny své objednávky, lístky i historii
              dobíjení na jednom místě.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <LoginFormFields
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                Přihlásit se
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger render={trigger} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Vítejte zpět!</DrawerTitle>
          <DrawerDescription>
            Přihlaste se a uvidíte všechny své objednávky, lístky i historii
            dobíjení na jednom místě.
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <LoginFormFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />

          <DrawerFooter className="p-0 mt-2">
            <Button type="submit" disabled={isSubmitting}>
              Přihlásit se
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
