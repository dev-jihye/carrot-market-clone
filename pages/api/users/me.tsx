import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  if (!profile) {
    res.status(404).json({
      ok: false,
      error: 'Page not found',
    });
  }
  res.json({
    ok: true,
    profile,
  });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
