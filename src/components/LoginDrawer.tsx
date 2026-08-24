import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { ApiError } from "@/api/errors";
import { useLocale } from "@/hooks/useLocale";
import { Loader2, Lock, Mail, Ticket } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { AuthUser, LoginRequest } from "@/types";

interface LoginDrawerProps {
  trigger: React.ReactElement;
  onLogin: (credentials: LoginRequest) => Promise<AuthUser>;
}

function useLoginForm(onLogin: (credentials: LoginRequest) => Promise<AuthUser>) {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onLogin({ email, password });
      toast.add({ description: t("login.success") });
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : t("login.failed");
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
  const { t } = useLocale();

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="login-email">{t("login.email")}</Label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            id="login-email"
            type="email"
            placeholder={t("login.emailPlaceholder")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-10 pl-8"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="login-password">{t("login.password")}</Label>
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            id="login-password"
            type="password"
            placeholder={t("login.passwordPlaceholder")}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-10 pl-8"
            required
          />
        </div>
      </div>
    </>
  );
}

export const LoginDrawer = ({ trigger, onLogin }: LoginDrawerProps) => {
  const { t } = useLocale();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { email, setEmail, password, setPassword, isSubmitting, handleSubmit } =
    useLoginForm(onLogin);

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger render={trigger} />
        <DialogContent>
          <DialogHeader className="items-center text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary-50">
              <Ticket className="text-primary-100" size={24} />
            </div>
            <DialogTitle>{t("login.welcome")}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <LoginFormFields
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />

            <DialogFooter>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary-100 text-white hover:bg-primary-200"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="animate-spin" />}
                {t("login.submit")}
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
        <DrawerHeader className="items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary-50">
            <Ticket className="text-primary-100" size={24} />
          </div>
          <DrawerTitle>{t("login.welcome")}</DrawerTitle>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <LoginFormFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />

          <DrawerFooter className="p-0 mt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary-100 text-white hover:bg-primary-200"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="animate-spin" />}
              {t("login.submit")}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
