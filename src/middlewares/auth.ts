import { Request, Response, NextFunction } from 'express'
import jwt from 'jwt-simple'
import moment from 'moment'

import Utils from '../utils/responseParser'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['user-token'] as string
  if (!token || token === '' )
    return res.status(401).json(Utils.getResposeError('Token no encontrado'))

  let payload

  try {
    payload = jwt.decode(token, process.env.SECRET || 'aa')
  } catch{
    return res.status(401).json(Utils.getResposeError('Token invalido'))
  }

  if (moment().unix() > payload.expiredAr)
    return res.status(401).json(Utils.getResposeError('Token expirado'))

  req.body = {
    ...req.body,
    ...payload
  }

  next()

}