export const formatDate = (dateString) => {
  if (!dateString) return "No due date";

  const date = new Date(dateString);

  if(Number.isNaN(date.getTime())){
    return 'Invalide date'
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  
};

export const capitalize = (string = "") => {
  if (!string) return "";

  return string.charAt(0).toUpperCase() + string.slice(1);
};
