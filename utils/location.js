export const GOOGLE_API_KEY = "AIzaSyC3oWwLTXlZl-LQhsMhJ-UJ0lXVWfhs7YA";

export const getMapPreview = (lat, lng, type) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=400x200&maptype=roadmap&markers=color:red%7Clabel:${
    type === "bike" ? "B" : "S"
  }%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

export const getMapPreviewWithTwoLocations = (latStart, lngStart,latEnd,lngEnd) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latStart},${lngStart}&zoom=12&size=400x200&maptype=roadmap&markers=color:greeb%7Clabel:%7C${latStart},${lngStart}&markers=color:red%7Clabel:C%7C${latEnd},${lngEnd}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};
