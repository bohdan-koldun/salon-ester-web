import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { blogPosts } from '../lib/blog';
import { useImageMap } from '../lib/useImages';

const BlogList: React.FC = () => {
  const images = useImageMap();

  return (
    <section className="section section--bg">
      <div className="container">
        <div className="section__head">
          <h1>Блог про штори</h1>
          <p>
            Розповідаємо про тканини та системи штор, щоб ви обрали найкраще
            рішення для свого інтер'єру.
          </p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => {
            const img = images[post.image];
            return (
              <Link
                className="blog-card"
                key={post.slug}
                to={`/blog/${post.slug}/`}
              >
                <div className="blog-card__img">
                  {img && <GatsbyImage image={img} alt={post.imageAlt} />}
                </div>
                <div className="blog-card__body">
                  <h2>{post.title}</h2>
                  <p>{post.intro}</p>
                  <span className="link-cta" aria-hidden="true">
                    Читати →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
