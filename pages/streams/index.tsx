import type { NextPage } from 'next';
import Link from 'next/link';
import FloatingButton from '@components/floatingButton';
import Layout from '@components/layout';
import { Stream } from '@prisma/client';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import useInfiniteScroll from '@libs/client/useInfiniteScroll';

interface StreamResponse {
  ok: boolean;
  streams: Stream[];
  pages: number;
}

const getKey = (pageIndex: number, previousPageData: StreamResponse) => {
  if (pageIndex === 0) return `/api/streams?page=1`;
  if (pageIndex + 1 > previousPageData.pages) return null;
  return `/api/streams?page=${pageIndex + 1}`;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Streams: NextPage = () => {
  const { data, setSize } = useSWRInfinite<StreamResponse>(getKey, fetcher);
  const streams = data ? data.map((item) => item.streams).flat() : [];
  const page = useInfiniteScroll();
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  return (
    <Layout title="라이브" hasTabBar>
      <div className="py-10 divide-y-2 space-y-4">
        {streams.map((stream) => (
          <Link key={stream.id} href={`/streams/${stream.id}`}>
            <a className="pt-4 block px-4">
              <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
              <h1 className="text-2xl mt-2 font-bold text-gray-900">
                {stream.name}
              </h1>
            </a>
          </Link>
        ))}
        <FloatingButton href="/streams/create">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Streams;
