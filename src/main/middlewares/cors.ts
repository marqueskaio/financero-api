import { type Request, type Response, type NextFunction } from 'express'
export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*')
    .set('access-control-allow-methods', '*')
    .set('access-control-allow-allow-headers', '*')
  next()
}
