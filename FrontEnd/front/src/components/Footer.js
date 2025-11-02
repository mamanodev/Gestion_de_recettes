import React from "react";

export default function Footer() {
    return (
        <footer className="bg-warning border-top mt-5">
            <div className="container-fluid py-3">
                <div className="d-flex  align-items-center text-center text-md-center px-3">

                    <div className="col-12">
                        <h5 className="fw-bold text-dark mb-0">
                            <span className="text-white">RECETTE</span>APP
                        </h5>
                        <small className="text-muted">
                            Découvrez et partagez vos recettes préférées !<br></br>

                            &copy; {new Date().getFullYear()} RecetteApp — Créé avec ❤️ par Ermane Veillard
                        </small>
                    </div>

                </div>
            </div>
        </footer>
    );
}
