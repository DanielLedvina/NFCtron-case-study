import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface CheckoutFooterProps {
  isVisible?: boolean;
}

export const CheckoutFooter = ({ isVisible = false }: CheckoutFooterProps) => {
  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      {/* inner content */}
      <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
        {/* total in cart state */}
        <div className="flex flex-col">
          <span>Total for [?] tickets</span>
          <span className="text-2xl font-semibold">[?] CZK</span>
        </div>

        {/* checkout button */}

        <Button
          variant="default"
          onClick={() => toast.add({ description: "Event has been created." })}
        >
          Checkout now
        </Button>
      </div>
    </footer>
  );
};
