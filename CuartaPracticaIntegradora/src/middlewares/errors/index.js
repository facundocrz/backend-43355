import EErrors from "../../utils/errors/enum.errors.js";

export default (error, req, res, next) => {
  console.log(error.cause);
  switch (error.cause) {
    case EErrors.NOT_FOUND:
      res.status(404).send({ status: "error", error: error.name });
      break;
    case EErrors.UNAUTHORIZED:
      res.status(401).send({ status: "error", error: error.name });
      break;
    case EErrors.INVALID_TYPE_ERROR:
      res.status(400).send({ status: "error", error: error.name });
      break;
    default:
      res.status(500).send({ status: "error", error: "Unhandled error" });
  }
};
