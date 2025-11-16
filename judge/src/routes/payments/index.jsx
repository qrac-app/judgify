import { useCustomer, CheckoutDialog } from "autumn-js/react";

export default function PurchaseButton() {
  const { checkout } = useCustomer();

  return (
    <button
      onClick={async () => {
        await checkout({
          productId: "pro",
          dialog: CheckoutDialog,
        });
      }}
    >
      Upgrade to Pro
    </button>
  );
}