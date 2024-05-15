"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

export default function ProductForm({ product }: { product?: Product | null }) {
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents,
  );
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {},
  );

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          id="name"
          type="text"
          required
          defaultValue={product?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          name="priceInCents"
          id="priceInCents"
          type="number"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
        {error.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Desctiption</Label>
          <Textarea
            name="description"
            id="description"
            required
            defaultValue={product?.description}
          />
          {error.description && (
            <div className="text-destructive">{error.description}</div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <Input
            name="file"
            id="file"
            type="file"
            required={product === null}
          />
          {product != null && (
            <div className="text-muted-foreground">{product.filePath}</div>
          )}
          {error.file && <div className="text-destructive">{error.file}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input
            name="image"
            id="image"
            type="file"
            required={product === null}
          />
          {product != null && (
            <Image
              src={product.imagePath}
              height="400"
              width="400"
              alt="Product Image"
            />
          )}
          {error.image && <div className="text-destructive">{error.image}</div>}
        </div>
      </div>
      <SubmitButton />
    </form>
  );

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </Button>
    );
  }
}
