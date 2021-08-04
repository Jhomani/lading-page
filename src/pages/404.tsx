import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

function FourZeroFour() {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <div className="not-found">

        <div className="iso404Content" >
          <h1>
            Error 404
          </h1>
          <h3> subTitle </h3>
          <p>
            description
          </p>
          <button type="button">
            <Link href="/dashboard" >
              <a className="isoMenuHolder" >
                <span className="nav-text" >
                  backButton
                </span>
              </a>
            </Link>
          </button>
        </div>

        <div className="iso404Artwork">
          <img alt="#" src='/static/images/rob.png' />
        </div>
      </div>
    </>
  );
}

export default FourZeroFour;
