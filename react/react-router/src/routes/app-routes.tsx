import { Route, Routes } from 'react-router'

import { Home } from '../pages/home'
import { Products } from '../pages/products'
import { NotFound } from '../pages/not-found'

export function AppRoutes() {
  return(
    <Routes>
      <Route path='/' index element={<Home />}  />
      <Route path='/products' element={<Products />}  />

      <Route path='*' element={<NotFound />}  />
    </Routes>
  )
}