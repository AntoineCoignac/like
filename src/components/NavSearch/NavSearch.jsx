import "./NavSearch.css";

function NavSearch({ setType, activeType }) {
  const handleClick = (event) => {
    const elementId = event.target.id;
    setType(elementId);
    console.log(elementId);
  }

  return (
    <div className="navsearch">
      <button onClick={handleClick} id="gig" className={activeType === "gig" ? "active" : ""}>
        Tarifs
      </button>
      <button onClick={handleClick} id="creator" className={activeType === "creator" ? "active" : ""}>
        Créateurs
      </button>
    </div>
  );
}

export default NavSearch;
