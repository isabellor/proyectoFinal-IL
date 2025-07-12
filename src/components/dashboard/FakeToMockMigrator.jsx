import { useEffect } from "react";
import axios from "axios";

export default function FakeToMockMigrator() {
  useEffect(() => {
    const migrateProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        const products = res.data;

        for (const product of products) {
          await axios.post(
            "https://6869a2a02af1d945cea243a0.mockapi.io/api/v1/products",
            {
              name: product.title,
              description: product.description,
              price: product.price,
              image: product.image,
              category: product.category
            }
          );
          console.log(`Producto ${product.title} migrado ✅`);
        }

        console.log("🚀 Todos los productos migrados correctamente.");
      } catch (error) {
        console.error("Error al migrar productos:", error);
      }
    };

    migrateProducts();
  }, []);

  return <p>Migrando productos...</p>;
}
