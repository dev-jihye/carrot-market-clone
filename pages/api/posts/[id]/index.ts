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
    session: { user },
  } = req;
  const post = await client.post.findUnique({
    where: {
      id: +id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avartar: true,
        },
      },
      answers: {
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avartar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          curiosity: true,
        },
      },
    },
  });
  const isCuriosity = Boolean(
    await client.curiosity.findFirst({
      where: {
        postId: +id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  if (!post) {
    res.status(404).json({
      ok: false,
      error: 'Post not found',
    });
  }
  res.json({
    ok: true,
    post,
    isCuriosity,
  });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
