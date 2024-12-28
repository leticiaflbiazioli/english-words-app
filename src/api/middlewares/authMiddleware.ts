export const checkAuthToken = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    throw new Error("Token de autenticação não encontrado");
  }
  return token;
};
