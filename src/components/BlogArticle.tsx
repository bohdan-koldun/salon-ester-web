import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from './Layout';
import LeadForm from './LeadForm';
import { useImageMap } from '../lib/useImages';
import { scrollToForm } from '../lib/scroll';
import { track } from '../lib/tracking';
import type { BlogPost } from '../lib/blog';

interface Props {
  post: BlogPost;
}

const BlogArticle: React.FC<Props> = ({ post }) => {
  const images = useImageMap();
  const img = images[post.image];

  const handleCta = () => {
    track('blog_cta_click', { label: post.slug });
    scrollToForm(
      { service: post.formService, message: post.formMessage },
      'blog_article'
    );
  };

  return (
    <Layout>
      <article className="section section--bg blog-article">
        <div className="container blog-article__head">
          <p className="eyebrow">Блог</p>
          <h1>{post.title}</h1>
          <p className="blog-article__intro">{post.intro}</p>
        </div>

        {img && (
          <div className="container">
            <div className="blog-article__hero">
              <GatsbyImage image={img} alt={post.imageAlt} />
            </div>
          </div>
        )}

        <div className="container blog-article__body">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.list && (
                <ul className="blog-article__list">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="blog-article__cta">
            <button type="button" className="btn" onClick={handleCta}>
              Замовити {post.ctaLabel}
            </button>
          </div>
        </div>
      </article>

      <LeadForm />
    </Layout>
  );
};

export default BlogArticle;
