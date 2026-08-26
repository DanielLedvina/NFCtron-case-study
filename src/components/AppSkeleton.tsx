import {
  Armchair,
  CreditCard,
  Globe,
  Minus,
  Moon,
  Plus,
  RotateCcw,
  ShoppingCart,
  Sun,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/lib/i18n/translations";

const STEP_ICONS = [Armchair, ShoppingCart, CreditCard];

interface AppSkeletonProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  locale: Locale;
  onToggleLocale: () => void;
}

export const AppSkeleton = ({
  theme,
  onToggleTheme,
  locale,
  onToggleLocale,
}: AppSkeletonProps) => {
  const { t } = useLocale();

  return (
    <div className="flex min-h-screen flex-col grow">
      <nav className="fixed top-0 left-0 right-0 z-10 flex justify-center md:mt-4 md:px-4">
        <div className="max-w-screen-lg md:mx-auto md:w-full w-full md:rounded-full bg-background/70 backdrop-blur-md md:shadow-sm border-b border-border md:border h-16 px-2 pl-4 grow flex items-center justify-between gap-3">
          <div className="flex h-10 items-center rounded-full bg-black-100 px-4">
            <img src="/nfctron-logo.png" alt="NFCtron" className="h-5" />
          </div>
          {/* Theme/locale come from localStorage, not the pending event/tickets fetch, so they
              work immediately here. Login stays disabled — authenticating now would leave the
              user logged in but still staring at this skeleton until the event data arrives. */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon-lg"
              className="hidden h-11 w-11 md:flex"
              onClick={onToggleTheme}
              aria-label={t("nav.toggleTheme")}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="hidden w-[4.5rem] px-3 md:flex"
              onClick={onToggleLocale}
              aria-label={t("nav.toggleLanguage")}
            >
              <Globe />
              <span className="text-xs font-semibold">
                {locale === "cs" ? "EN" : "CS"}
              </span>
            </Button>

            <Button
              size="lg"
              disabled
              className="hidden min-w-[9.5rem] justify-center bg-primary-100 text-white md:flex"
            >
              {t("nav.login")}
            </Button>
            <Skeleton className="h-11 w-11 rounded-full md:hidden" />
          </div>
        </div>
      </nav>

      <main className="grow flex flex-col justify-center pt-16 md:pt-20">
        <div className="max-w-screen-lg m-auto p-4 flex flex-col xl:flex-row items-stretch grow gap-3 w-full">
          <div className="bg-card rounded-md min-w-0 xl:w-0 grow shadow-sm flex flex-col overflow-hidden">
            <div className="flex flex-col gap-4 p-4">
              <div className="flex items-center gap-2">
                <Armchair className="text-primary-100" size={20} />
                <h2 className="text-lg font-semibold text-foreground">
                  1. {t("stepper.seats.title")}
                </h2>
              </div>
              <div className="flex items-center">
                {STEP_ICONS.map((Icon, index) => (
                  <div
                    key={index}
                    className={index < 2 ? "flex flex-1 items-center" : "flex items-center"}
                  >
                    <div
                      className={
                        index === 0
                          ? "flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-100 text-white"
                          : "flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
                      }
                    >
                      <Icon size={20} />
                    </div>
                    {index < 2 && <div className="mx-2 h-0.5 flex-1 rounded-full bg-border" />}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {t("stepper.seats.description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 p-3">
              <div className="flex flex-wrap items-center gap-3 rounded-md bg-muted p-3">
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="flex items-center justify-end gap-1">
                <Button variant="outline" size="icon-sm" disabled aria-label={t("seatMap.zoomOut")}>
                  <Minus />
                </Button>
                <Button variant="outline" size="icon-sm" disabled aria-label={t("seatMap.zoomIn")}>
                  <Plus />
                </Button>
                <Button variant="outline" size="icon-sm" disabled aria-label={t("seatMap.resetView")}>
                  <RotateCcw />
                </Button>
              </div>
            </div>

            {/* items-center matches SeatMap's TransformComponent, which centers the seat grid horizontally too. */}
            <div className="flex grow flex-col items-center justify-center gap-2 px-6 pb-6">
              {Array.from({ length: 6 }).map((_, row) => (
                <div key={row} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4 shrink-0" />
                  <div className="flex gap-2">
                    {Array.from({ length: 8 }).map((_, seat) => (
                      <Skeleton key={seat} className="size-8 shrink-0 rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="w-full xl:max-w-sm shrink-0">
            <div className="w-full xl:h-full bg-card rounded-md shadow-sm p-3 flex flex-col gap-3">
              <Skeleton className="w-full aspect-3/1 rounded-md" />
              <Skeleton className="h-6 w-3/4" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <Skeleton className="h-10 w-full rounded-full" />
              <Skeleton className="h-32 xl:grow w-full rounded-md" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
