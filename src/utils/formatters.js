export const formatDate = (dateString) => {
  if (!dateString) return "No due date";

  const date = new Date(dateString);

  if(Number.isNaN(date.getTime())){
    return "Invalide date"
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

export const isOverdue = (dateString) => {
    if(!dateString) return false;

    const dueDate = new Date(dateString);
    const today = new Date();

    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
}

export const isDueSoon = (dateString, days = 3) => {
    if(!dateString) return false

    const dueDate = new Date(dateString);
    const today = new Date();

    const diffinMs = dueDate - today;
    const diffinDays = diffinMs / (1000 * 60 * 60 * 24);

    return diffinDays >= 0 && diffinDays <= days;
};
