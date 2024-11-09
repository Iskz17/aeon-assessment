// src/app/api/transaction-history/route.js
export async function GET() {
  const transactionHistory = [
    {
      id: 1,
      date: "2024-11-08",
      referenceId: "TX123456",
      to: "Alice",
      transactionType: "Payment",
      amount: 100.0,
    },
    {
      id: 2,
      date: "2024-11-07",
      referenceId: "TX123457",
      to: "Bob",
      transactionType: "Subscription",
      amount: -50.0,
    },
    {
      id: 3,
      date: "2024-11-06",
      referenceId: "TX123458",
      to: "Charlie",
      transactionType: "Refund",
      amount: 25.0,
    },
  ];

  return new Response(JSON.stringify(transactionHistory), {
    headers: { "Content-Type": "application/json" },
  });
}
