export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return formattedDate
}

export const capitalize = (string = '') => {
    if(!string) return '';

    return string.charAt(0).toUpperCase() + string.slice(1); 
}