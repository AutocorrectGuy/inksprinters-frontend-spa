export const dateStringToUTC = (dateString: string): number | null => {
  // Regular expression to match the date format 'dd.mm.yyyy'
  const datePattern = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.(\d{4})$/;
  
  // Check if dateString matches the expected format
  const match = dateString.match(datePattern);
  if (!match) {
    console.error('Date string does not match the format dd.mm.yyyy');
    return null;
  }
  
  // Destructure the matched parts
  const [day, month, year] = match.slice(1);
  
  // Create a date object using the extracted values
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid date');
    return null;
  }

  // Return the UTC timestamp
  return date.getTime();
}
