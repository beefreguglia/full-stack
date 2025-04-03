import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import searchSvg from "../assets/search.svg"
import { RefundItem, RefundItemProps } from "../components/RefundItem";
import { CATEGORIES } from "../utils/categories";
import { Pagination } from "../components/Pagination";

const REFUND_EXAMPLE = {
  id: "123456789",
  name: "Bernardo",
  category: "Alimentação",
  amount: 35.5,
  categoryImg: CATEGORIES.food.icon,
}
export function Dashboard() {
  const [name, setName] = useState("")
  const [page, setPage] = useState(1)
  const [totalOfPages] = useState(10)
  const [refunds, setRefunds] = useState<RefundItemProps[]>([REFUND_EXAMPLE])


  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(name)
  }

  function handlePagination(
    action: "next" | "prev"
  ) {
    setPage((prevPage) => {
      if(action === "next" && prevPage < totalOfPages) {
        return prevPage + 1
      }

      if(action === "prev" && prevPage > 1) {
        return prevPage - 1
      }

      return prevPage;
    })
  }

  return(
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
      <h1 className="text-gray-100 font-bold text-xl flex-1">
        Solicitações
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-between pb-6 border-b-[1px] border-b-gray-400 md: flex-row gap-2 mt-6"
      >
        <Input 
          placeholder="Pesquisar pelo nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Button type="submit" variant="icon">
          <img src={searchSvg} alt="Ícone de pesquisar" className="w-5" />
        </Button>
      </form>
      <div className="my-6 flex-col gap-4 max-h-[342px] overflow-y-scroll">
        {refunds.map((refund) => (
          <RefundItem
            key={refund.id} 
            item={refund}
            href={`/refund/${refund.id}`}
          />
        ))}
      </div>
      <Pagination 
        current={page}
        total={totalOfPages}
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("prev")}
      />
    </div>
  )
}