// validation.ts

// Função para validar email
export function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para validar CPF
export function isCPFValid(cpf: string): boolean {
  const cpfRegex = /^\d{11}$/;
  return cpfRegex.test(cpf);
}

// Função para validar senha
export function isPasswordValid(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

// Função para validar CNPJ
export function isCNPJValid(cnpj: string): boolean {
  const cnpjRegex = /^\d{14}$/;
  return cnpjRegex.test(cnpj);
}
