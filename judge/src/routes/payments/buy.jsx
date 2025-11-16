import { useCustomer } from "autumn-js/react";

export default function SendChatMessage() {
  const { customer, check, refetch } = useCustomer();

  return (
    <>
      <button
        onClick={async () => {
          const { data } = check({ featureId: "messages" });

          if (!data?.allowed) {
            alert("You're out of messages");
          } else {
            //send chatbot message server-side, then
            await refetch(); // refetch customer usage data

            //display remaining messages
            const messages = customer?.features.messages;
            console.log("Remaining messages: " + messages?.balance);
          }
        }}
      >
        Send AI Message
      </button>
    </>
  );
}