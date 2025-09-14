function crudScopeFor(req) {
  const resource = (req.path.replace(/^\/+/, "").split("/")[0] || "").toLowerCase();
  const m = (req.method || "GET").toUpperCase();
  const action =
    m === "GET"    ? "read"   :
    m === "POST"   ? "create" :
    m === "PUT"    ? "update" :
    m === "PATCH"  ? "update" :
    m === "DELETE" ? "delete" : "read";
  return `${action}:${resource}`;
}

module.exports = { crudScopeFor };