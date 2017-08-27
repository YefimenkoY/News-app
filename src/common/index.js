export const shortenTitle = title => (
  title.length > 15 ? `${title.slice(0, 25)}...` : title
);