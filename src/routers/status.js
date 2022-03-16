const { Router } = require("express");
const router = Router();

router.get("*", (req, res, netx) => {
  res.status(404).render("status/404", { title: "Pagina web no encontrada" });
});

router.post("*", (req, res, netx) => {
  res.status(404).render("status/404", { title: "Pagina web no encontrada" });
});

module.exports = router;