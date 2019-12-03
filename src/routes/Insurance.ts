import { Router, Request, Response, NextFunction } from "express";
import { InsuranceDao } from "../daos";
import { OK, BAD_REQUEST } from "http-status-codes";
import { logger } from "../shared/Logger";
import { paramMissingError } from "../shared/Misc";

const router = Router();
const insuranceDao = new InsuranceDao();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const insurances = insuranceDao.get();
    logger.info(`Insurances ${insurances.length}`);
    return res.status(OK).json({ data: { ...insurances } });
  } catch (err) {
    logger.error("Error al obtener los seguros a vender");
    return res
      .status(BAD_REQUEST)
      .json({ error: `Error al obtener los seguros a vender` });
  }
});

router.post("/add", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { insurance } = req.body;
    if (!insurance) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    const insurances = insuranceDao.add(insurance);
    logger.info(`Insurance list${insurances.length}`);
    return res.status(OK).json({ data: { ...insurances } });
  } catch (err) {
    logger.error("Error al obtener los seguros a vender");
    return res
      .status(BAD_REQUEST)
      .json({ error: `Error al obtener los seguros a vender` });
  }
});

router.get(
  "/evaluateProducts/:days",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      let { days } = req.params;
      if (!days || !Number(days)) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError
        });
      }
      const daysToSimulate = Number(days);
      const insurances = insuranceDao.simulate(daysToSimulate);
      logger.info(`Insurance list${insurances.length}`);
      return res.status(OK).json({ data: { ...insurances } });
    } catch (err) {
      logger.error("Error al obtener los seguros a vender");
      return res
        .status(BAD_REQUEST)
        .json({ error: `Error al obtener los seguros a vender` });
    }
  }
);

export default router;
