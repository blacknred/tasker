// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApBaseResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApBaseResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
