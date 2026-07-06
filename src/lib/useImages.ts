import { graphql, useStaticQuery } from 'gatsby';
import { getImage, type IGatsbyImageData } from 'gatsby-plugin-image';

interface QueryResult {
  allFile: {
    nodes: Array<{
      relativePath: string;
      name: string;
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
        large: IGatsbyImageData;
      } | null;
    }>;
  };
}

/**
 * Повертає мапу relativePath → IGatsbyImageData для всіх зображень у src/images.
 * Дозволяє динамічно діставати зображення за іменем файлу з config.ts.
 */
export function useImageMap(): Record<string, IGatsbyImageData> {
  const data = useAllImages();

  const map: Record<string, IGatsbyImageData> = {};
  for (const node of data.allFile.nodes) {
    const img = node.childImageSharp ? getImage(node.childImageSharp) : undefined;
    if (img) {
      map[node.relativePath] = img;
      map[node.name] = img; // також за іменем без розширення/шляху
    }
  }
  return map;
}

/**
 * Мапа зображень з layout CONSTRAINED — для лайтбокса.
 * FULL_WIDTH-обгортка з useImageMap не має власного розміру і схлопується
 * поза сіткою (напр. у flex-контейнері лайтбокса), тому для збільшеного
 * перегляду потрібен окремий шар з реальними intrinsic-розмірами.
 */
export function useLargeImageMap(): Record<string, IGatsbyImageData> {
  const data = useAllImages();

  const map: Record<string, IGatsbyImageData> = {};
  for (const node of data.allFile.nodes) {
    const img = node.childImageSharp?.large;
    if (img) {
      map[node.relativePath] = img;
      map[node.name] = img;
    }
  }
  return map;
}

function useAllImages(): QueryResult {
  return useStaticQuery<QueryResult>(graphql`
    query AllImages {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          extension: { in: ["jpg", "jpeg", "png", "webp"] }
        }
      ) {
        nodes {
          relativePath
          name
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              quality: 72
              formats: [AUTO, WEBP]
            )
            large: gatsbyImageData(
              layout: CONSTRAINED
              width: 1600
              placeholder: BLURRED
              quality: 82
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  `);
}
