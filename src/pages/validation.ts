// validation.ts

// Função para validar email
export function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para validar CPF
export function isCPFValid(cpf: string): boolean {
  // remove a máscara se tiver 12 remove o ultimo
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length > 11) {
    cpf = cpf.substring(0, 11);
  }
  const cpfRegex = /^\d{11}$/;
  return cpfRegex.test(cpf);
}

// Função para validar senha
export function isPasswordValid(password: string): boolean {
  // Senha deve conter 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial
  const regex =
    /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;
  return password.length > 8 && regex.test(password);
}

// Função para validar CNPJ com máscara
export function isCNPJValid(cnpj: string): boolean {
  // remove a máscara se tiver 15 remove o ultimo
  cnpj = cnpj.replace(/[^\d]+/g, "");
  if (cnpj.length > 14) {
    cnpj = cnpj.substring(0, 14);
  }
  const cnpjRegex = /^\d{14}$/;
  return cnpjRegex.test(cnpj);
}
