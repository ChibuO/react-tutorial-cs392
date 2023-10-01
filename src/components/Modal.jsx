import './Modal.css'

export const Modal = ({ title, children, open, close }) => (
    <div
      className={`modal ${open ? 'modal-show' : 'modal-hidden'}`}
      tabIndex="-1"
      role="dialog"
      onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <button type="button" className="close-btn" aria-label="Close"
              onClick={close}>X</button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );