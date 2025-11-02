import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ConfirmModal({ show, onClose, onConfirm, message }) {
    return (
        <div
            className={`modal fade ${show ? "show d-block" : ""}`}
            tabIndex="-1"
            style={{
                backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent",
            }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-primary">Confirmation</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <p>{message || "Voulez-vous vraiment supprimer cet élément ?"}</p>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Annuler
                        </button>
                        <button type="button" className="btn btn-primary" onClick={onConfirm}>
                            Oui
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
