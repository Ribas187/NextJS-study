import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}


export default function Category({ products }: CategoryProps) {
  const router = useRouter();

  // Verify if the page data is loading
  if (router.isFallback) return <h1>Carregando...</h1>

  return (
    <div>
      <h1>Product: {router.query.slug} </h1>

      <ul>
        {products.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  )
}

// This function get all(or just the most accessed) the params/paths
// the page can receive
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/categories`);
  const categories = await response.json();

  const paths = categories.map(category => {
    return {
      params: { slug: category.id },
    }
  })

  // Fallback allow to access paths which hasn't been generated yet
  // and it will generate on the first time someone access
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const { slug } = context.params;

  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 5,
  }
}
