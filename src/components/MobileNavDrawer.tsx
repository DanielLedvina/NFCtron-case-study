import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoginDrawer } from "@/components/LoginDrawer";
import { useLocale } from "@/hooks/useLocale";
import type { AuthUser, LoginRequest } from "@/types";
import { ArrowRight, LogOut, Menu, Moon, Sun } from "lucide-react";

interface MobileNavDrawerProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  locale: "cs" | "en";
  onToggleLocale: () => void;
  user: AuthUser | undefined;
  isLoggedIn: boolean;
  onLogin: (credentials: LoginRequest) => Promise<AuthUser>;
  onLogout: () => void;
}

export const MobileNavDrawer = ({
  theme,
  onToggleTheme,
  locale,
  onToggleLocale,
  user,
  isLoggedIn,
  onLogin,
  onLogout,
}: MobileNavDrawerProps) => {
  const { t } = useLocale();

  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger
        render={
          <Button
            variant="outline"
            size="icon-lg"
            className="h-11 w-11"
            aria-label={t("nav.menu")}
          />
        }
      >
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="w-[80%] max-w-sm gap-4 p-4">
        <DrawerTitle className="sr-only">{t("nav.menu")}</DrawerTitle>

        {isLoggedIn && user ? (
          <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
            <Avatar size="lg" className="after:border-none">
              <AvatarFallback className="bg-primary-100 text-white">
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold text-foreground">
                {user.firstName} {user.lastName}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        ) : (
          <LoginDrawer
            onLogin={onLogin}
            trigger={
              <Button
                size="lg"
                className="w-full justify-center bg-primary-100 text-white hover:bg-primary-200"
              >
                {t("nav.login")}
                <ArrowRight />
              </Button>
            }
          />
        )}

        <button
          type="button"
          onClick={onToggleTheme}
          className="flex items-center gap-3 rounded-lg p-3 text-left text-sm font-medium text-foreground hover:bg-muted"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          {theme === "dark" ? t("nav.lightMode") : t("nav.darkMode")}
        </button>

        <button
          type="button"
          onClick={onToggleLocale}
          className="flex items-center gap-3 rounded-lg p-3 text-left text-sm font-medium text-foreground hover:bg-muted"
        >
          <span
            className={`fi fis shrink-0 rounded-full text-lg ${locale === "cs" ? "fi-gb" : "fi-cz"}`}
          />
          {locale === "cs" ? t("nav.english") : t("nav.czech")}
        </button>

        {isLoggedIn && (
          <DrawerClose
            render={
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-3 rounded-lg p-3 text-left text-sm font-medium text-destructive hover:bg-destructive/5"
              />
            }
          >
            <LogOut size={18} />
            {t("nav.logout")}
          </DrawerClose>
        )}
      </DrawerContent>
    </Drawer>
  );
};
