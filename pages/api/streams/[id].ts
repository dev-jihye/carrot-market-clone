import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req;
  const stream = await client.stream.findUnique({
    where: {
      id: +id,
    },
  });
  if (!stream) {
    res.status(404).json({
      ok: false,
      error: 'Page not found',
    });
  }

  res.json({
    ok: true,
    stream,
  });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));