import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { compile } from 'path-to-regexp';
import * as YelpAPI from '../services/yelp';

interface HomePageProps extends YelpAPI.BusinessesResponse, YelpAPI.CategoryResponse {
  location: string;
}

const reviewLink = compile('/reviews/:id', { encode: encodeURIComponent });

export default function HomePage({ location, category, businesses }: HomePageProps) {
  return (
    <div>
      <h3>The best {category.title} in {location}</h3>
      <ol>
      {businesses?.map(b => {
        const link = reviewLink({ id: b.id });
        return (
          <Link key={b.id} href={link}>
            <li><a href={link}>{b.name} ({b.rating} from {b.review_count} reviews)</a></li>
          </Link>
        )
      })}
      </ol>
    </div>
  );
}

const location = 'Alpharetta';
const category = 'icecream';

export const getServerSideProps: GetServerSideProps = async () => {
  const [categoryResponse, businessesResponse] = await Promise.all([
    YelpAPI.categoryDetails({ params: { alias: category } }),
    YelpAPI.businessesSearch({ params: { location, categories: category, limit: 5, sort_by: 'rating' } }),
  ]);

  return {
    props: {
      location,
      ...categoryResponse,
      ...businessesResponse
    }
  };
};
