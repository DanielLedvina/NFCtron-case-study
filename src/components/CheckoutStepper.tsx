import {
  ArrowLeft,
  Armchair,
  Check,
  CreditCard,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import type { TranslationKey } from "@/lib/i18n/translations";

export type CheckoutStep = "seats" | "summary" | "payment";

const STEPS: {
  id: CheckoutStep;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  icon: typeof Armchair;
}[] = [
  {
    id: "seats",
    titleKey: "stepper.seats.title",
    descriptionKey: "stepper.seats.description",
    icon: Armchair,
  },
  {
    id: "summary",
    titleKey: "stepper.summary.title",
    descriptionKey: "stepper.summary.description",
    icon: ShoppingCart,
  },
  {
    id: "payment",
    titleKey: "stepper.payment.title",
    descriptionKey: "stepper.payment.description",
    icon: CreditCard,
  },
];

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
  onStepClick?: (step: CheckoutStep) => void;
  canReachSummary?: boolean;
}

export const CheckoutStepper = ({
  currentStep,
  onStepClick,
  canReachSummary = false,
}: CheckoutStepperProps) => {
  const { t } = useLocale();
  const currentIndex = STEPS.findIndex((step) => step.id === currentStep);
  const current = STEPS[currentIndex];
  const CurrentIcon = current.icon;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        {currentIndex > 0 && (
          <button
            type="button"
            aria-label={t("stepper.back")}
            onClick={() => onStepClick?.(STEPS[currentIndex - 1].id)}
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-muted"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <CurrentIcon className="text-primary-100" size={20} />
        <h2 className="text-lg font-semibold text-foreground">
          {currentIndex + 1}. {t(current.titleKey)}
        </h2>
      </div>

      <ol className="flex items-center">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isReachable =
            index <= currentIndex ||
            (step.id === "summary" && canReachSummary);
          const Icon = step.icon;

          return (
            <li
              key={step.id}
              className={cn(
                "flex items-center",
                index < STEPS.length - 1 && "flex-1",
              )}
            >
              <button
                type="button"
                disabled={!isReachable}
                onClick={() => isReachable && onStepClick?.(step.id)}
                aria-label={t(step.titleKey)}
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-full transition-colors",
                  isCompleted && "bg-emerald-500 text-white cursor-pointer",
                  isCurrent &&
                    "bg-primary-100 text-white cursor-pointer",
                  !isCompleted &&
                    !isCurrent &&
                    isReachable &&
                    "bg-muted text-muted-foreground cursor-pointer hover:bg-muted/70",
                  !isCompleted &&
                    !isCurrent &&
                    !isReachable &&
                    "bg-muted text-muted-foreground cursor-default",
                )}
              >
                {isCompleted ? <Check size={20} /> : <Icon size={20} />}
              </button>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 flex-1 rounded-full",
                    isCompleted ? "bg-emerald-500" : "bg-border",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>

      <p className="text-sm text-muted-foreground">
        {t(current.descriptionKey)}
      </p>
    </div>
  );
};
