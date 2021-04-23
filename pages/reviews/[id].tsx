import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import * as YelpAPI from '../../services/yelp';

interface ReviewsPageProps extends YelpAPI.ReviewsResponse {
  business: YelpAPI.BusinessResponse;
}

export default function ReviewsPage({ business, reviews }: ReviewsPageProps) {
  const address = [business.location.address1, business.location.address2, business.location.address3, business.location.city].filter(Boolean).join(', ');
  return (
    <div>
      <Link href="/"><a href="/">Back</a></Link>
      <h3>{business.name} at {address}</h3>
      <ul>
        {reviews.map(r => {

          return (
            <li key={r.id}>
              <p>{r.text}</p>
              <div>Author: {r.user.name}</div>
              <div>Rating: {r.rating}</div>
            </li>
          )
        })}
      </ul>
      <Link href="/"><a href="/">Back</a></Link>
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  if (!params) {
    res.statusCode = 404
    return { props: { errorCode: 404, business: null } };
  }
  const id = params.id as string;

  const [business, reviewsResponse] = await Promise.all([
    YelpAPI.businessesDetails({ params: { id }}),
    YelpAPI.businessesReviews({ params: { id }})
  ]);

  return {
    props: {
      business,
      ...reviewsResponse
    }
  };
};
