import PageHeader from "@/app/admin/_components/PageHeader";
import db from "@/db/db";
import ProductForm from "../../_component/ProductForm";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });

  return (
    <>
      <PageHeader>Edit Prodect</PageHeader>
      <ProductForm product={product} />
    </>
  );
}
