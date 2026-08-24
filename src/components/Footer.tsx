import { Globe, MessageCircle, Send } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import type { TranslationKey } from "@/lib/i18n/translations";

const LINK_COLUMNS: { titleKey: TranslationKey; linksKey: TranslationKey }[] = [
  { titleKey: "footerNav.product", linksKey: "footerNav.productLinks" },
  { titleKey: "footerNav.support", linksKey: "footerNav.supportLinks" },
  { titleKey: "footerNav.company", linksKey: "footerNav.companyLinks" },
];

export const Footer = () => {
  const { t } = useLocale();

  return (
    <footer className="mt-auto bg-footer-background text-footer-muted">
      <div className="max-w-screen-lg mx-auto px-4 py-10 flex flex-col gap-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-2 self-start">
              <div className="flex h-9 items-center rounded-full bg-black-100 px-3">
                <img
                  src="/nfctron-logo.png"
                  alt=""
                  className="h-4 w-auto object-contain"
                />
              </div>
              <span className="text-lg font-semibold text-footer-foreground">
                NFCtron
              </span>
            </div>
            <p className="text-sm text-footer-muted">
              {t("footerNav.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {LINK_COLUMNS.map((column) => (
              <div key={column.titleKey} className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-footer-foreground">
                  {t(column.titleKey)}
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {t(column.linksKey)
                    .split(",")
                    .map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-footer-muted hover:text-footer-foreground"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-4 border-t border-footer-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-footer-muted">
            {t("footerNav.copyright", { year: new Date().getFullYear() })}
          </span>

          <div className="flex items-center gap-2">
            {[Globe, MessageCircle, Send].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label={t("footerNav.socialLink")}
                className="flex size-8 items-center justify-center rounded-full border border-footer-border text-footer-muted hover:text-footer-foreground"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
