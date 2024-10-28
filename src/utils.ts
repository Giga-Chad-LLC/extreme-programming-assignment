import { Status } from '@prisma/client';


export const checkPresent = (obj: any, res: any, msg: string): boolean => {
  if (obj == null || obj == undefined) {
    res.status(400).json({ error: msg });
    return false;
  }
  return true;
}

export const checkIsStatus = (value: any, res: any, msg: string): boolean => {
  if (!Object.values(Status).includes(value as Status)) {
    res.status(400).json({ error: msg })
    return false;
  }
  return true;
}