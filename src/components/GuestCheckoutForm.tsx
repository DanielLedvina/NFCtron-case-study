import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useLocale } from "@/hooks/useLocale";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface GuestCheckoutFormProps {
  onSubmit: (guest: { firstName: string; lastName: string; email: string }) => void;
  isSubmitting?: boolean;
}

export const GuestCheckoutForm = ({
  onSubmit,
  isSubmitting = false,
}: GuestCheckoutFormProps) => {
  const { t } = useLocale();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email)) {
      toast.add({ description: t("login.emailInvalid") });
      return;
    }

    onSubmit({ firstName, lastName, email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="guest-first-name">{t("guest.firstName")}</Label>
        <Input
          id="guest-first-name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="guest-last-name">{t("guest.lastName")}</Label>
        <Input
          id="guest-last-name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="guest-email">{t("guest.email")}</Label>
        <Input
          id="guest-email"
          type="email"
          placeholder={t("guest.emailPlaceholder")}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <Button
        type="submit"
        className="bg-primary-100 text-white hover:bg-primary-200"
        disabled={isSubmitting}
      >
        {t("guest.submit")}
      </Button>
    </form>
  );
};
