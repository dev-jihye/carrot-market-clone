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
  if (req.method === 'GET') {
    if (!profile) {
      res.status(404).json({
        ok: false,
        error: 'Page not found',
      });
    }
  }
  if (req.method === 'POST') {
    const {
      session: { user },
      body: { email, phone },
    } = req;
    if (email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: { email },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: 'Email already exists',
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
      res.json({ ok: true });
    } else if (phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: { phone },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: 'Phone number already exists',
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone,
        },
      });
    }
  }
  res.json({
    ok: true,
    profile,
  });
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
