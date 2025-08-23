export const formatPrice = (amount, currency = "৳") => {
  const formatted = amount.toLocaleString("en-BD"); 
  return (
    <div className="flex items-center gap-1 text-nowrap">
      {currency} {" "}
      {Math.round(formatted)}
    </div>
  );
};
