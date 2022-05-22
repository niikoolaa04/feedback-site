// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from 'js-cookie'

export default function handler(req, res) {
  cookie.remove("token");
  res.redirect("/");
}
