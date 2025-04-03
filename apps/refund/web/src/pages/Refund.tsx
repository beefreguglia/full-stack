import { useState } from "react";
import { Input } from "../components/Input";
import { Select } from "../components/select";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
import { useNavigate, useParams } from "react-router";
import fileSvg from '../assets/file.svg'

export function Refund() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [fileName, setFilename] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (id) {
      return navigate(-1)
    } 

    e.preventDefault();
    setIsLoading(true);
    console.log(name, category, amount, fileName);
    navigate("/confirm", { state: { fromSubmit: true } })
    setIsLoading(true);
  }

  return (
    <form 
      onSubmit={onSubmit} 
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]"
    >
      <header>
        <h1 className="text-xl font-bold text-gray-100">Solicitação de reembolso</h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">Dados da despesa para solicitar reembolso.</p>
      </header>
      <Input 
        required
        legend="Nome da solicitação"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!!id}
      />
      <div className="flex gap-4">
        <Select 
          required 
          legend="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={!!id}
        >
          {CATEGORIES_KEYS.map((category) => (
            <option
              key={category}
              value={category}
            >
              {CATEGORIES[category].name}
            </option>
          ))}
        </Select>
        <Input 
          required
          legend="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!!id}
        />
      </div>
      {id ? (
        <a 
          href="" 
          target="_blank"
          className="text-sm text-gray-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear"
        >
          <img src={fileSvg} alt="Ícone de arquivo" />
          Abrir comprovante
        </a>
      ) : (
        <Upload
          filename={fileName?.name}
          onChange={(e) => e.target.files && setFilename(e.target.files[0])}
        />
      )}
      
      <Button type="submit" isLoading={isLoading}>
        {id ? "Voltar": "Enviar"}
      </Button>
    </form>
  )
}