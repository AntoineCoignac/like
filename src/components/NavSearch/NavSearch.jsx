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
        Tarif
      </button>
      <button onClick={handleClick} id="user" className={activeType === "user" ? "active" : ""}>
        Profil
      </button>
    </div>
  );
}

export default NavSearch;
