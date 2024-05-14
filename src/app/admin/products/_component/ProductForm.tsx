"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";

export default function ProductForm() {
  const [priceInCents, setPriceInCents] = useState<number>();

  return (
    <form className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" type="text" required />
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
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Desctiption</Label>
          <Textarea name="description" id="description" required />
        </div>
      </div>
    </form>
  );
}
