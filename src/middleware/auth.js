export default function auth(to, from, next) {
  if (!sessionStorage.getItem("token")) {
    return next({ path: "/login" });
  }
  return next();
}
