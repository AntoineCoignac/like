import "./NavSearch.scss";

function NavSearch({ setType, activeType }) {
  const handleClick = (event) => {
    const elementId = event.target.id;
    setType(elementId);
  }

  return (
    <div className="navsearch">
      <button onClick={handleClick} id="gig" className={activeType === "gig" ? "active" : ""}>
      🚀 Prestas
      </button>
      <button onClick={handleClick} id="user" className={activeType === "user" ? "active" : ""}>
      🕵️ Profils
      </button>
    </div>
  );
}

export default NavSearch;
