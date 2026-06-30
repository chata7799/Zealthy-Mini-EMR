function SectionCard({ title, children }) {

    return (

        <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body">

                <h5 className="fw-bold mb-4">

                    {title}

                </h5>

                {children}

            </div>

        </div>

    );

}

export default SectionCard;