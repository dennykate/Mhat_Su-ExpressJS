export default (req, res, next) => {
  res.success = (data, statusCode = 200) => {
    res.status(statusCode).json({ success: true, data });
  };

  res.error = (data, statusCode = 400) => {
    res.status(statusCode).json({ success: false, data });
  };

  return next();
};
