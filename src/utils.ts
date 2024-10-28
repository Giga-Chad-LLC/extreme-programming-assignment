
export const checkPresent = (obj: any, res: any, msg: string): boolean => {
  if (!obj) {
    res.status(400).json({ error: msg });
    return false;
  }
  return true;
}