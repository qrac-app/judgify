import { Autumn as autumn } from "autumn-js";

// same user id from auth as in the autumn handler
const { data } = await autumn.check({
  customer_id: "user_123",
  feature_id: "messages",
});
if (!data?.allowed) {
  console.log("No more messages for you buddy!");
  return;
}

// ... your own function to send the message

// then record the usage in Autumn
await autumn.track({
  customer_id: "user_123",
  feature_id: "messages",
});