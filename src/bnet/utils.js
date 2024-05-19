const formatPrice = (rawValue) => {
  const converted = parseInt(rawValue, 10);
  if (Number.isNaN(converted)) {
    return undefined;
  }
  return converted / 10000;
};

const formatDate = (timestamp, options) => {
  const date = Intl.DateTimeFormat(options.locale, {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: options.tz || 'GMT',
  });
  return date.format(timestamp);
};

module.exports = {
  formatPrice,
  formatDate,
};
