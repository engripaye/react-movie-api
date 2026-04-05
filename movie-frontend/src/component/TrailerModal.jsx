import "../css/TrailerModal.css";

function TrailerModal({ videoKey, onClose }) {
    if (!videoKey) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✖</button>

                <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${videoKey}`}
                    title="Trailer"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}

export default TrailerModal;