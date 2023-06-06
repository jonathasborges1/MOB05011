
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

interface User {
  id: number;
  login: string;
  senhaHash: string;
}

// Array fictício de usuários para fins de exemplo
const usuarios: User[] = [
  { id: 1, login: "admin", senhaHash: "$2b$10$uOCupFnRRJrDohyfC9UwX.lq5lYwdJrOHQ6/82GCrHTu3iYmAObTe" },
  { id: 2, login: "jhon", senhaHash: "$2b$10$9G3odDLH7.gPDX.CesgfxedPYHWYxSfww5jCT3A42rz6Le5BQsb4u" },
];

export async function login (req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  const user = usuarios.find((user) => user.login === username);
  if (!user) {
    return res.send("Usuário não encontrado");
  }

  const passwordMatch = await bcrypt.compare(password, user.senhaHash);
  if (!passwordMatch) {
    return res.send("Senha incorreta");
  }

  req.app.locals.user = { username };
  res.redirect("/");
}

export function logout(req: Request, res: Response) {
  req.app.locals.user = null;
  res.redirect("/login");
}

