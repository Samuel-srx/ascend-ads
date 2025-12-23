function App() {
  return (
    <div
      style={{
        backgroundColor: "#020617",
        minHeight: "100vh",
        color: "white",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ marginTop: 0 }}>Ascend Ads</h1>

        <p style={{ color: "#cbd5e1", fontSize: "18px" }}>
          Tráfego pago e crescimento digital
        </p>

        {/* Link da política */}
        <div style={{ marginTop: "40px" }}>
          <a
            href="/privacidade.html"
            style={{
              color: "#a5b4fc",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Política de Privacidade
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
