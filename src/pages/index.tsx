import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {

  return (
    <div>
      <section>
        <Title>Hello World, Ribas</Title>

        <ul>
          {recommendedProducts.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

// This function fetch the data on the server side so the data can be
// handled by the search engines
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  }
}
