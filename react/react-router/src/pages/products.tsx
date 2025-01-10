import { useSearchParams } from "react-router"

export function Products() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category');
  const price = searchParams.get('price');
  
  return(
    <div>
      <h1>Página Products</h1>
      <nav>
        <a href="/">Home</a>
      </nav>
      {category && (
        <span>
          Categoria <strong>{category} </strong>
          <br />
        </span>
      )}
      {price && (
        <span>
          Preço <strong>{price}</strong>
        </span>
      )}
    </div>
  )
}