import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ image, title, text, onClick, buttons = [] }) => {
    const navigate = useNavigate();

    return (
        <div
            className="card shadow-sm recipe-card"
            style={{
                width: "18rem",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
        >
            {image && (
                <img
                    src={image}
                    className="card-img-top"
                    alt={title || "Card image"}
                    style={{ height: "180px", objectFit: "cover" }}
                />
            )}

            <div
                className="card-body d-flex flex-column justify-content-between"
                onClick={(e) => e.stopPropagation()} // Empêche le clic sur la carte d'affecter les boutons
            >
                <div>
                    <h5 className="card-title fw-bold ">{title || "Titre"}</h5>
                    <p className="card-text text-muted ">{text || "Texte descriptif"}</p>
                </div>


                {buttons.length > 0 && (
                    <div className="d-flex  justify-content-start gap-2 mt-3">
                        {buttons.map((btn, idx) =>
                            btn.type === "link" ? (
                                <button
                                    key={idx}
                                    onClick={() => navigate(btn.href)}
                                    className={`btn btn-${btn.variant || "primary"} btn-sm `}
                                >
                                    {btn.label}
                                </button>
                            ) : (
                                <button
                                    key={idx}
                                    onClick={btn.onClick}
                                    className={`btn btn-${btn.variant || "secondary"}  btn-sm `}
                                >
                                    {btn.label}
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
