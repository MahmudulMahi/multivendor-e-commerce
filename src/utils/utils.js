export const maskPhone = (phone) => {
  if (!phone || phone.length < 5) return phone;
  const first = phone.slice(0, 3);
  const last = phone.slice(-2);
  const masked = "*".repeat(phone.length - 5);
  return `${first}${masked}${last}`;
};
export  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth is 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }