import { fetchProductBySlug } from '../../../utils/api';
import ProductDetail from '../../../_components/ProductDetail';

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const product = await fetchProductBySlug(params.slug);
    return <ProductDetail product={product} />;
}