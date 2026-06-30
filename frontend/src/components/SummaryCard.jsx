function SummaryCard({

    title,

    value,

    color

}) {

    return (

        <div className="col-md-4">

            <div
                className={`card border-0 shadow-sm bg-${color} text-white`}
            >

                <div className="card-body">

                    <h6>

                        {title}

                    </h6>

                    <h2>

                        {value}

                    </h2>

                </div>

            </div>

        </div>

    );

}

export default SummaryCard;