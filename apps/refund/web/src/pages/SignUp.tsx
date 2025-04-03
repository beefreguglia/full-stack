import { useState } from "react";
import { z, ZodError } from "zod";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signUpSchema = z
    .object({
      name: z.string().trim().min(1, "Informe o nome"),
      email: z.string().email({ message: "E-mail inválido" }),
      password: z.string().min(7, "Senha deve ter pelo menos 7 dígitos"),
      passwordConfirm: z.string({ message: "Confirme a senha" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "As senhas não são iguais",
      path: ["passwordConfirm"],
    });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const data = signUpSchema.parse({
        name,
        email,
        password,
        passwordConfirm,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      alert("Não foi possível cadastrar!");
    } finally {
      setIsLoading(false);
    }
    console.log(name, email, password, passwordConfirm, isLoading);
    alert("Enviado");
  }

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
      <Input
        required
        legend="Nome"
        placeholder="Seu Nome"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        required
        legend="E-mail"
        type="email"
        placeholder="seu@email.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        required
        legend="Senha"
        type="password"
        placeholder="123456"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        required
        legend="Confirmação da senha"
        type="passwordConfirm"
        placeholder="123456"
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <Button type="submit" isLoading={isLoading}>
        Cadastrar
      </Button>
      <a
        href="/"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Já tenho uma conta
      </a>
    </form>
  );
}
