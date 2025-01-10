export function Home() {
  return(
    <div>
      <h1>Página Home</h1>
      <nav>
        <a href="/products">Produtos</a>
        <a href="/products?category=tvs">Categoria</a>
        <a href="/products?category=tvs&price=2000">Price</a>
      </nav>
    </div>
  )
}