export default (err, req, res, next) => {
  console.log(err);
  const message = err.statusCode ? err.message : "Internal server error";
  const statusCode = err.statusCode ?? 500;

  return res.error(message, statusCode);
};
